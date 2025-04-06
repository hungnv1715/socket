<template>
  <v-select
    variant="outlined"
    density="compact"
    label="銀行を選択してください。"
    clearable
    :items="[
      'ベトフン',
      '中古マンション',
      'Florida',
      'Georgia',
      'Texas',
      'Wyoming',
    ]"
  ></v-select>
</template>

<script setup></script>
