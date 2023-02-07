<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { defineProps, toRefs } from "vue";

ChartJS.register(BarController, CategoryScale, LinearScale, BarElement);

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
  <Bar :data="chartData" :options="chartOptions" />
</template>
