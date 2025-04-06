<template>
  <v-toolbar density="compact" color="blue-lighten-3">
    <v-app-bar-nav-icon readonly icon="mdi-magnify"></v-app-bar-nav-icon>

    <v-toolbar-title>Your Dashboard</v-toolbar-title>
    <div>hhhhhhhhhhhhh</div>
    <v-spacer />

    <v-icon icon="mdi-information" size="35" :style="buttonStyle"></v-icon>
    <v-icon
      icon="mdi-alert"
      size="35"
      class="mx-4"
      :style="buttonStyle"
    ></v-icon>
    <v-icon
      icon="mdi-logout"
      size="35"
      class="mx-5"
      @click="toggleColor"
      :style="buttonStyle"
    ></v-icon>

    <template v-slot:extension>
      <v-tabs v-model="tab" align-tabs="title" hide-slider>
        <v-tab
          v-for="item in items"
          :key="item.path"
          :value="item.path"
          :to="item.path"
          rounded="lg"
          height="47"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-spacer />
      <span>{{ messages }}</span>
      <v-btn icon="mdi-magnify" variant="text"></v-btn>
    </template>
  </v-toolbar>
</template>

<script setup>
import { computed } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";



const route = useRoute();

const tab = computed({
  get: () => route.path,
  set: () => {}, // Điều hướng sẽ do <v-tab :to="..."> đảm nhiệm
});

const items = [
  { name: "Web", path: "/" },
  { name: "Shopping", path: "/shopping" },
  { name: "Videos", path: "/videos" },
  { name: "Images", path: "/images" },
  { name: "News", path: "/news" },
];

const isClicked = ref(false);

const buttonStyle = computed(() => {
  return {
    color: isClicked.value ? "#EF5350" : "#FFD54F", // Đổi màu theo trạng thái
  };
});

const toggleColor = () => {
  isClicked.value = !isClicked.value; // Lật lại trạng thái mỗi khi nhấn nút
};

const props = defineProps({
  messages: String
})


</script>



<style scoped>
.v-tab-item--selected {
  background-color: #e3f2fd;
}
</style>
