<!-- src/views/WebView.vue -->
<template>
  <v-container>
    <h1>News Page</h1>
    <v-btn @click="goToVideosView" color="primary">Go to Videos</v-btn>
  </v-container>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Hàm để chuyển đến trang VideosView
const goToVideosView = () => {
  router.push({ name: 'VideosView' }) // Điều hướng đến route với tên 'VideosView'
}
</script>