<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { defineProps, toRefs } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement } from "chart.js";
ChartJS.register(ArcElement, ArcElement);

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
