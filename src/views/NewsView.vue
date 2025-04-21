<template>
  <v-container fluid>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">Tên</th>
          <th class="text-center">Tuổi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>
            <input
              v-model="item.name"
              class="cell-input"
              type="text"
            />
          </td>
          <td>
            <input
              v-model="item.age"
              class="cell-input"
              type="number"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-container>
      <v-text-field variant="solo-filled" density="compact" flat hide-details single-line ></v-text-field>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { name: 'An', age: 25 },
  { name: 'Bình', age: 30 },
])
</script>

<style scoped>
.cell-input {
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: top;
  padding: 8px;
}

/* td {
  border: 1px solid #ccc;
  padding: 0;
} */




</style>
