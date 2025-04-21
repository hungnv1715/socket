<template>
  <v-container fluid class="pa-4">
    <!-- Header -->
    <v-row>
      <v-col cols="12" class="box header">
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Đây là Header</v-toolbar-title>
        </v-toolbar>
      </v-col>
    </v-row>

    <!-- Main content + Slide bar -->
    <v-row>
      <v-col style="border: 1px solid red"> Trái </v-col>

      <v-spacer style="border: 1px solid red" />

      <v-col style="border: 1px dashed #ccc"> Phải </v-col>
    </v-row>

    <!-- Footer -->
    <v-row>
      <v-col cols="12" class="box footer">
        <v-footer color="grey lighten-2">
          <span class="mx-auto">© 2025 Bản quyền thuộc về bạn</span>
        </v-footer>
      </v-col>
    </v-row>
    <LocationSelector v-model="selectedLocation" />

    <pre>{{ selectedLocation }}</pre>
  </v-container>
</template>

<style scoped>
.box {
  border: 1px dashed #ccc;
  padding: 8px;
  margin-bottom: 8px;
}
.header {
  background-color: #3f51b5;
}
.content {
  min-height: 300px;
}
.sidebar {
  min-height: 300px;
}
.footer {
  text-align: center;
  background-color: #eee;
}
</style>

<script setup>
import { ref } from "vue";

import LocationSelector from "./LocationSelector.vue";

const selectedLocation = ref({
  provinceCode: null,
  districtCode: null,
  wardCode: null,
  hamletCode: null,
});
</script>
