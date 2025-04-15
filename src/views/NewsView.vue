<!-- Map.vue -->
<template>
  <svg width="1000" height="1000">
    <polyline points="0,0 800,00" stroke="grey" fill="none" />
    <polyline points="0,10 800,10" stroke="grey" fill="none" />
    <polyline points="0,20 800,20" stroke="grey" fill="none" />
    <polyline points="0,30 800,30" stroke="grey" fill="none" />
    <polyline points="0,40 800,40" stroke="grey" fill="none" />
    <polyline points="0,50 800,50" stroke="grey" fill="none" />
    <polyline points="0,60 800,60" stroke="grey" fill="none" />
    <polyline points="0,70 800,70" stroke="grey" fill="none" />
    <polyline points="0,0 0,400" stroke="grey" fill="none" />
    <polyline points="10,0 10,400" stroke="grey" fill="none" />
    <polyline points="20,0 20,400" stroke="grey" fill="none" />
    <polyline points="30,0 30,400" stroke="grey" fill="none" />
    <polyline points="40,0 40,400" stroke="grey" fill="none" />
    <polyline points="50,0 50,400" stroke="grey" fill="none" />
    <polyline points="60,0 60,400" stroke="grey" fill="none" />
    <polyline points="60,0 60,400" stroke="grey" fill="none" />
    <polyline points="70,0 70,400" stroke="grey" fill="none" />
    <polyline points="80,0 80,400" stroke="grey" fill="none" />
    <polyline points="90,0 90,400" stroke="grey" fill="none" />
    <polyline points="100,0 100,400" stroke="grey" fill="none" />
    <polyline points="110,0 110,400" stroke="grey" fill="none" />
    <polyline points="120,0 120,400" stroke="grey" fill="none" />
    <defs>
      <symbol id="switch-1-on">
        <polyline points="-10,-10 10,10 20,0" stroke="green" fill="none" />
        <text x="25" y="12" fill="green">ON</text>
      </symbol>
      <symbol id="switch-1-off">
        <polyline points="0,10 10,0 20,10" stroke="red" fill="none" />
        <text x="25" y="12" fill="red">OFF</text>
      </symbol>
      <symbol id="switch-2-on">
        <rect x="0" y="0" width="20" height="20" fill="blue" />
        <text x="25" y="15" fill="blue">ON</text>
      </symbol>
      <symbol id="switch-2-off">
        <rect x="0" y="0" width="20" height="20" fill="gray" />
        <text x="25" y="15" fill="gray">OFF</text>
      </symbol>
    </defs>

    <SwitchSymbol
      v-for="switchItem in switches"
      :key="switchItem.id"
      :switch-id="switchItem.id"
      :status="switchItem.status"
      :x="switchItem.x"
      :y="switchItem.y"
    />
  </svg>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SwitchSymbol from './SwitchSymbol.vue'; // Đảm bảo đường dẫn đúng

const switches = ref([
  { id: 1, status: 'on', x: 20, y: 20 },
  { id: 2, status: 'off', x: 60, y: 60 },
  // { id: 2, status: 'off', x: 300, y: 150 },
  // { id: 2, status: 'off', x: 400, y: 150 },
  // Loại bỏ { id: 3, status: 'on', x: 300, y: 200 } vì không có symbol tương ứng
]);

const updateSwitchStatus = (switchId, newStatus) => {
  const switchItem = switches.value.find((s) => s.id === switchId);
  if (switchItem) {
    switchItem.status = newStatus;
  }
};

let intervalId = null;
onMounted(() => {
  intervalId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * switches.value.length);
    // switches.value[randomIndex].status =
    //   switches.value[randomIndex].status === 'on' ? 'off' : 'on';
  }, 2000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>