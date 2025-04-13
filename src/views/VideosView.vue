<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

// Ref để tham chiếu đến phần tử DOM chứa biểu đồ
const chart = ref(null);

// Dữ liệu (giữ nguyên như bạn cung cấp, có giá trị âm trong familyB)
const families = {
  familyA: [
    // Buổi sáng (00:00–06:00, 12 điểm, thấp)
    1.0, 0.9, 0.8, 0.7, 0.8, 0.9, 1.1, 1.2, 1.0, 0.9, 0.8, 0.7,
    // Ban ngày (06:00–18:00, 24 điểm, cao)
    2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 5.2, 4.8, 4.5, 4.2, 4.0,
    4.0, 4.2, 4.5, 4.8, 15.2, 5.5, 5.2, 4.5, 4.0, 3.5, 3.0, 2.5,
    // Buổi tối (18:00–24:00, 12 điểm, thấp)
    1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.8, 0.9, 1.0,
  ],
  familyB: [
    // Buổi sáng (00:00–06:00, 12 điểm, thấp)
    0.8, 0.7, 0.6, 0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 0.8, 0.7, 0.6,
    // Ban ngày (06:00–18:00, 24 điểm, cao, có giá trị âm)
    2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 0, 4.6, 4.3, 4.0, 3.8, 3.5,
    3.5, 3.8, 4.0, 4.3, 4.6, 4.8, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0,
    // Buổi tối (18:00–24:00, 12 điểm, thấp)
    1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.6, 0.7, 0.8, 0.9,
  ],
  familyC: [
    // Buổi sáng (00:00–06:00, 12 điểm, thấp)
    1.2, 1.1, 1.0, 0.9, 0.9, 1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.8,
    // Ban ngày (06:00–18:00, 24 điểm, cao)
    2.8, 3.2, 3.8, 4.2, 4.8, 5.2, 5.8, 5.5, 5.0, 4.8, 4.5, 4.2,
    4.2, 4.5, 4.8, 5.0, 5.5, 5.8, 5.2, 4.8, 4.2, 3.8, 3.2, 2.8,
    // Buổi tối (18:00–24:00, 12 điểm, thấp)
    1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.1, 1.2, 1.3,
  ],
};

// Tạo mảng thời gian cho trục x (48 điểm, mỗi điểm cách nhau 30 phút)
const times = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? '00' : '30';
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
});

// Chuyển dữ liệu thành định dạng phù hợp cho D3
const data = times.map((time, i) => ({
  time,
  familyA: families.familyA[i],
  familyB: families.familyB[i],
  familyC: families.familyC[i],
}));

// Cài đặt kích thước biểu đồ
const margin = { top: 20, right: 30, bottom: 80, left: 40 };
const width = 1400 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Hàm vẽ biểu đồ
const drawChart = () => {
  // Tạo SVG
  const svg = d3
    .select(chart.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Tạo scale cho trục x và y
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.time))
    .range([0, width])
    .padding(0.1);

  // Tính giá trị min và max, điều chỉnh yMin
  let yMin = d3.min(data, (d) => Math.min(d.familyA, d.familyB, d.familyC));
  const yMax = d3.max(data, (d) => Math.max(d.familyA, d.familyB, d.familyC));

  // Thêm khoảng trống bằng cách mở rộng domain
  // const yPadding = (yMax - yMin) * 0.01; // 10% khoảng giá trị
  const y = d3
    .scaleLinear()
    .domain([yMin , yMax]) // Thêm padding trên/dưới
    .nice()
    .range([height, 0]);

  // Thêm lưới dọc (vertical grid lines)
  svg
    .append('g')
    .attr('class', 'grid')
    .selectAll('line')
    .data(data)
    .enter()
    .append('line')
    .attr('x1', (d) => x(d.time) + x.bandwidth() / 2)
    .attr('x2', (d) => x(d.time) + x.bandwidth() / 2)
    .attr('y1', 0)
    .attr('y2', height)
    .attr('stroke', '#e0e0e0')
    .attr('stroke-opacity', 0.5)
    .attr('stroke-width', 1);

  // Thêm lưới ngang (horizontal grid lines)
  svg
    .append('g')
    .attr('class', 'grid')
    .call(
      d3
        .axisLeft(y)
        .ticks(6) // Giảm số lượng ticks xuống ~6
        .tickSize(-width)
        .tickFormat('')
    )
    .selectAll('.tick line')
    .attr('stroke', '#e0e0e0')
    .attr('stroke-opacity', 0.5);

  // Thêm đường tại y=0 nếu có giá trị âm
  if (yMin < 0) {
    svg
      .append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(0))
      .attr('y2', y(0))
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.7);
  }

  // Vẽ trục x cố định ở dưới cùng
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .style('display', (d) => (d.endsWith(':30') ? 'block' : 'none'))
    .style('text-anchor', 'start')
    .attr('dx', '0.8em')
    .attr('dy', '0.15em')
    .attr('transform', 'rotate(45)');

  // Vẽ trục y với ít ticks hơn
  svg.append('g').call(d3.axisLeft(y).ticks(6));

  // Định nghĩa các đường với đường cong mượt
  const lineA = d3
    .line()
    .x((d) => x(d.time) + x.bandwidth() / 2)
    .y((d) => y(d.familyA))
    .curve(d3.curveMonotoneX);

  const lineB = d3
    .line()
    .x((d) => x(d.time) + x.bandwidth() / 2)
    .y((d) => y(d.familyB))
    .curve(d3.curveMonotoneX);

  const lineC = d3
    .line()
    .x((d) => x(d.time) + x.bandwidth() / 2)
    .y((d) => y(d.familyC))
    .curve(d3.curveMonotoneX);

  // Vẽ đường cho từng gia đình
  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', lineA);

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'green')
    .attr('stroke-width', 1.5)
    .attr('d', lineB);

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 1.5)
    .attr('d', lineC);

  // Thêm chấm tròn cho Family A
  svg
    .selectAll('.dotA')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dotA')
    .attr('cx', (d) => x(d.time) + x.bandwidth() / 2)
    .attr('cy', (d) => y(d.familyA))
    .attr('r', 4)
    .attr('fill', 'steelblue');

  // Thêm hình vuông cho Family B
  svg
    .selectAll('.squareB')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'squareB')
    .attr('x', (d) => x(d.time) + x.bandwidth() / 2 - 4)
    .attr('y', (d) => y(d.familyB) - 4)
    .attr('width', 8)
    .attr('height', 8)
    .attr('fill', 'green');

  // Thêm hình tam giác cho Family C
  svg
    .selectAll('.triangleC')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'triangleC')
    .attr('d', (d) => {
      const cx = x(d.time) + x.bandwidth() / 2;
      const cy = y(d.familyC);
      return `M${cx - 5},${cy + 5} L${cx + 5},${cy + 5} L${cx},${cy - 5} Z`;
    })
    .attr('fill', 'red');

  // Tạo tooltip
  const tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('background', 'white')
    .style('border', '1px solid #ddd')
    .style('padding', '5px')
    .style('opacity', 0)
    .style('pointer-events', 'none');

  // Thêm các vùng tương tác để hiển thị tooltip và hiệu ứng phóng to
  svg
    .selectAll('.point')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.time))
    .attr('y', 0)
    .attr('width', x.bandwidth())
    .attr('height', height)
    .attr('fill', 'transparent')
    .on('mouseover', function (event, d) {
      // Hiển thị tooltip
      tooltip
        .transition()
        .duration(200)
        .style('opacity', 1);
      tooltip
        .html(
          `Time: ${d.time}<br>Family A: ${d.familyA.toFixed(2)} kW<br>Family B: ${d.familyB.toFixed(2)} kW<br>Family C: ${d.familyC.toFixed(2)} kW`
        )
        .style('left', `${event.pageX + 15}px`)
        .style('top', `${event.pageY + 10}px`);

      // Phóng to điểm dữ liệu tại thời điểm hiện tại
      svg
        .selectAll('.dotA')
        .filter((datum) => datum.time === d.time)
        .transition()
        .duration(200)
        .attr('r', 6);

      svg
        .selectAll('.squareB')
        .filter((datum) => datum.time === d.time)
        .transition()
        .duration(200)
        .attr('width', 12)
        .attr('height', 12)
        .attr('x', (datum) => x(datum.time) + x.bandwidth() / 2 - 6)
        .attr('y', (datum) => y(datum.familyB) - 6);

      svg
        .selectAll('.triangleC')
        .filter((datum) => datum.time === d.time)
        .transition()
        .duration(200)
        .attr('d', () => {
          const cx = x(d.time) + x.bandwidth() / 2;
          const cy = y(d.familyC);
          return `M${cx - 7.5},${cy + 7.5} L${cx + 7.5},${cy + 7.5} L${cx},${cy - 7.5} Z`;
        });
    })
    .on('mouseout', function () {
      // Ẩn tooltip
      tooltip
        .transition()
        .duration(200)
        .style('opacity', 0);

      // Khôi phục kích thước gốc
      svg
        .selectAll('.dotA')
        .transition()
        .duration(200)
        .attr('r', 4);

      svg
        .selectAll('.squareB')
        .transition()
        .duration(200)
        .attr('width', 8)
        .attr('height', 8)
        .attr('x', (d) => x(d.time) + x.bandwidth() / 2 - 4)
        .attr('y', (d) => y(d.familyB) - 4);

      svg
        .selectAll('.triangleC')
        .transition()
        .duration(200)
        .attr('d', (d) => {
          const cx = x(d.time) + x.bandwidth() / 2;
          const cy = y(d.familyC);
          return `M${cx - 5},${cy + 5} L${cx + 5},${cy + 5} L${cx},${cy - 5} Z`;
        });
    });
};

// Vẽ biểu đồ khi component được mount
onMounted(() => {
  drawChart();
});
</script>
<style>
.tooltip {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  padding: 5px;
  pointer-events: none;
}
</style>

<template>
  <v-container fluid>
    <div ref="chart"></div>
  </v-container>
</template>