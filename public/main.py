from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import asyncio
import json
from datetime import datetime

app = FastAPI()

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        client_host = websocket.client.host if websocket.client else "unknown"
        print(f"--------------------[{datetime.now()}] New connection from {client_host}")
        print(f"Total active connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            client_host = websocket.client.host if websocket.client else "unknown"
            print(f"--------------------[{datetime.now()}] Connection closed from {client_host}")
            print(f"Remaining active connections: {len(self.active_connections)}")

    async def send_to_all(self, component_name: str, message: str):
        print(f"--------------------[{datetime.now()}] send_to_all")
        data = {
            "componentName": component_name,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        # print(f"Sending data: {data}")  # 送信データをログ出力
        for connection in self.active_connections:
            try:
                print("Sending data") 
                await connection.send_json(data)
            except Exception as e:
                print(f"Send error: {str(e)}")
                self.disconnect(connection)

manager = ConnectionManager()

async def component_broadcaster():
    counter = 0
    # print(f"--------------------[{datetime.now()}] broadcaster")
    while True:
        counter += 1
        # Gửi message cho tất cả clients
        await manager.send_to_all(
            component_name="Header",
            message=f"Broadcast message {counter}"
        )
        await manager.send_to_all(
            component_name="Router",
            message=f"Broadcast message router {counter}"
        )
        await asyncio.sleep(10)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(component_broadcaster())

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    client_host = websocket.client.host if websocket.client else "unknown"
    print(f"--------------------[{datetime.now()}] Attempting connection from {client_host}")
    await manager.connect(websocket)
    try:
        while True:
            # Giữ kết nối mở
            await websocket.receive_text()
    except WebSocketDisconnect:
        print(f"--------------------[{datetime.now()}] Client {client_host} disconnected")
        manager.disconnect(websocket)