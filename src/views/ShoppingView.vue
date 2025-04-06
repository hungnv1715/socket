<template>
  <v-container>
    <!-- Tiêu đề bảng -->
    <div class="d-flex font-weight-bold py-2 px-2 bg-grey-lighten-3">
      <div class="table-col id">ID</div>
      <div class="table-col name">Name</div>
      <div class="table-col email">Email</div>
      <div class="table-col body">Body</div>
    </div>

    <!-- Infinite scroll -->
    <v-infinite-scroll
      :items="items"
      :has-more="hasMore"
      @load="loadItems"
      height="400px"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="d-flex py-2 px-2 table-row"
      >
        <div class="table-col id">{{ item.id }}</div>
        <div class="table-col name">{{ item.name }}</div>
        <div class="table-col email">{{ item.email }}</div>
        <div class="table-col body">{{ item.body }}</div>
      </div>
    </v-infinite-scroll>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([])
const page = ref(1)
const hasMore = ref(true)
const limit = 10 // load 10 items mỗi lần

const loadItems = async ({ done }) => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page.value}&_limit=${limit}`)
    const data = await res.json()

    if (data.length < limit) {
      hasMore.value = false
      done('empty')
      return
    }

    items.value.push(...data)
    page.value++
    done('ok')
  } catch (e) {
    console.error('Lỗi tải dữ liệu:', e)
    done('error')
  }
}
</script>

<style scoped>
.table-col {
  padding: 4px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.table-row:nth-child(even) {
  background-color: #f9f9f9;
}
.id {
  width: 60px;
  font-weight: bold;
}
.name {
  width: 200px;
}
.email {
  width: 200px;
}
.body {
  flex: 1;
}
:deep(.v-infinite-scroll__side) {
  padding: 0 !important;
}

</style>
