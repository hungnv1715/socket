<template>
  <div>
    <button @click="toggleSymbol">Toggle Symbol</button>
    <svg width="200" height="200" viewBox="0 0 200 200" style="border: 1px solid #ccc">
      <defs>
        <g id="my-symbol-1-on">
          <polyline
            points="-10,10 10,10 10,-10 -10,-10 -10,10"
            fill="none"
            stroke="blue"
            stroke-width="1"
          />
          <polyline
            points="-13,13 13,13 13,-13 -13,-13 -13,13"
            fill="none"
            stroke="blue"
            stroke-width="1"
          />
        </g>
        <g id="my-symbol-1-off">
          <polyline
            points="-10,10 10,10 10,-10 -10,-10 -10,10"
            fill="red"
            stroke="red"
            stroke-width="1"
          />
          <polyline
            points="-13,13 13,13 13,-13 -13,-13 -13,13"
            fill="none"
            stroke="red"
            stroke-width="1"
          />
        </g>
        <g id="my-symbol-2-on">
          <polyline
            points="-5,5 5,5 5,-5 -5,-5 -5,5"
            fill="red"
            stroke="red"
            stroke-width="1"
          />
          <circle cx="0" cy="0" r="12" fill="none" stroke="red" />
        </g>
        <g id="my-symbol-2-off">
          <polyline
            points="-5,5 5,5 5,-5 -5,-5 -5,5"
            fill="blue"
            stroke="blue"
            stroke-width="1"
          />
          <circle cx="0" cy="0" r="12" fill="none" stroke="blue" />
        </g>
      </defs>

      <!-- Render các biểu tượng từ mảng symbols -->
      <g
        v-for="(symbol, index) in symbols"
        :key="index"
        :transform="`translate(${symbol.position.x}, ${symbol.position.y})`"
      >
        <use :href="`#my-symbol-${symbol.type}-${symbol.state ? 'on' : 'off'}`" />
      </g>

      <!-- Tâm kiểm tra -->
      <circle cx="20" cy="20" r="1" fill="red" />
      <circle cx="80" cy="80" r="1" fill="red" />
      <circle cx="120" cy="80" r="1" fill="blue" />
      <circle cx="150" cy="80" r="1" fill="blue" />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      symbols: [
        {
          type: '1',
          position: { x: 20, y: 20 },
          state: true, // on
        },
        {
          type: '1',
          position: { x: 80, y: 80 },
          state: false, // on
        },
        {
          type: '2',
          position: { x: 120, y: 80 },
          state: true, // on
        },
        {
          type: '2',
          position: { x: 150, y: 80 },
          state: false, // on
        },
      ],
    };
  },
  methods: {
    toggleSymbol() {
      this.symbols = this.symbols.map(symbol => ({
        ...symbol,
        state: !symbol.state, // Đảo trạng thái cho từng symbol
      }));
    },
  },
};
</script>