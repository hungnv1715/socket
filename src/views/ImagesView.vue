<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Comments Table with Infinite Scroll {{messages}}</v-card-title>

      <v-card-text>
        <v-table class="has-hover has-even-old" height="500px" fixed-header>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="comment in comments" :key="comment.id">
              <td>{{ comment.id }}</td>
              <td>{{ comment.name }}</td>
              <td>{{ comment.email }}</td>
              <td>{{ truncateText(comment.body, 30) }}</td>
            </tr>

            <!-- Intersection observer element -->
            <tr v-intersect="onIntersect" style="height: 1px"></tr>

            <!-- Loading indicator -->
            <tr v-if="loading">
              <td colspan="4" class="text-center py-4">
                <v-progress-circular indeterminate></v-progress-circular>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const comments = ref([]);
const loading = ref(false);
const page = ref(1);
const limit = ref(20);
const hasMore = ref(true);

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const fetchComments = async () => {
  if (!hasMore.value || loading.value) return;
  loading.value = true;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page.value}&_limit=${limit.value}`
    );

    const data = await response.json();

    if (data.length === 0) {
      hasMore.value = false;
      return;
    }

    const existingIds = new Set(comments.value.map((comment) => comment.id));
    const newItems = data.filter((comment) => !existingIds.has(comment.id));

    comments.value = [...comments.value, ...newItems];
    page.value++;

    if (newItems.length === 0 && data.length > 0) {
      page.value++;
      fetchComments();
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  } finally {
    loading.value = false;
  }
};

const onIntersect = (isIntersecting) => {
  if (isIntersecting && !loading.value) {
    fetchComments();
  }
};

onMounted(() => {
  fetchComments();
});


const props = defineProps({
  messages: String
})

</script>

<style lang="scss">
@use "@/assets/_custom-vtable.scss"; 
</style>
