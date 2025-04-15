<!-- SwitchSymbol.vue -->
<template>
    <g :transform="`translate(${x}, ${y})`">
      <use v-if="isValidSymbol" :xlink:href="`#switch-${switchId}-${status}`" />
      <text v-else x="0" y="15" fill="red">Invalid Symbol</text>
    </g>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    switchId: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      validator: (value) => ['on', 'off'].includes(value),
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  });
  
  // Kiểm tra xem symbol có tồn tại không
  const isValidSymbol = computed(() => {
    // Chỉ cho phép switchId là 1 hoặc 2 vì chỉ có symbol switch-1-* và switch-2-*
    return [1, 2].includes(props.switchId);
  });
  </script>