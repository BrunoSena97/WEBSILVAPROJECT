<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  LineController,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
} from "chart.js";
import { defineProps, toRefs } from "vue";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    default: () => { },
  },
});
const { chartData, chartOptions } = toRefs(props);
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
