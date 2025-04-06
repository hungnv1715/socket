import { ref, onUnmounted, readonly } from 'vue'

// Biến global để lưu trữ kết nối WebSocket duy nhất
let globalSocket = null
const messageHandlers = new Map()

export function useSocket(componentName) {
    const isConnected = ref(false)
    const componentData = ref(null)

    const registerHandler = () => {
        if (!messageHandlers.has(componentName)) {
            messageHandlers.set(componentName, (data) => {
                componentData.value = data
                console.log(`[${componentName}] Received data:`, data)
            })
        }
    }

    const connect = (url) => {
        if (globalSocket) {
            // Nếu đã có kết nối, chỉ cần đăng ký handler
            isConnected.value = true
            registerHandler()
            return
        }

        globalSocket = new WebSocket(url)

        globalSocket.onopen = () => {
            isConnected.value = true
            console.log('WebSocket connected')
            registerHandler()
        }

        globalSocket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data)
                const handler = messageHandlers.get(message.component)
                if (handler) {
                    handler(message.data)
                }
            } catch (e) {
                console.error('Error parsing WebSocket message:', e)
            }
        }

        globalSocket.onclose = () => {
            isConnected.value = false
            console.log('WebSocket disconnected')
        }

        globalSocket.onerror = (error) => {
            console.error('WebSocket error:', error)
        }
    }

    onUnmounted(() => {
        // Không đóng kết nối ở đây vì nó được dùng chung
        messageHandlers.delete(componentName)
    })

    return {
        connect,
        isConnected: readonly(isConnected),
        componentData: readonly(componentData)
    }
}