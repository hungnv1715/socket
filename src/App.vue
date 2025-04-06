<template>
  <v-app>
    <Header :messages="msg_for_header"/>

    <v-main class="bg-blue-lighten-5">
      <v-container fluid class="mt-1">
        <router-view  :messages="msg_for_router"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const msg_for_header = ref("")
const msg_for_router = ref("")

let ws = null

onMounted(() => {
  ws = new WebSocket('ws://localhost:8000/ws')

  // Xử lý sự kiện mở kết nối
  ws.onopen = () => {
    console.log('WebSocket connection opened')
  }

  // Xử lý tin nhắn nhận được
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      console.log(data)
      // Sửa lỗi chính tả tên biến
      if (data.componentName === 'Header') {
        msg_for_header.value=data.message // Sửa messages_for_header -> msg_for_header
      } 
      else if (data.componentName === 'Router') { // Sửa tên component cho rõ ràng
        msg_for_router.value = data.message // Sửa messages_for_route -> msg_for_router
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error)
    }
  }

  // Xử lý sự kiện đóng kết nối
  ws.onclose = (event) => {
    if (event.wasClean) {
      console.log(`WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`)
    } else {
      console.error('WebSocket connection died')
    }
  }

  // Xử lý lỗi
  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
})

onUnmounted(() => {
  if (ws) {
    // Đóng kết nối an toàn
    if (ws.readyState === WebSocket.OPEN) {
      ws.close(1000, 'Component unmounted') // Code 1000 = normal closure
    }
    // Cleanup reference
    ws = null
  }
})
</script>