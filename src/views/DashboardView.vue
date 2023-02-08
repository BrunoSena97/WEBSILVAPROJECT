<script setup>
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/machine.js";
import "@ui5/webcomponents-icons/dist/notes.js";
import BarChart from "../components/charts/BarChart.vue";
import LineChart from "../components/charts/LineChart.vue";
import DoughnutChart from "../components/charts/DoughnutChart.vue";
import * as Utils from "../components/charts/plugins/Utils";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import machinePoints from "../data/machinepoints.json";
import machines from "../data/machines.json";
import { onMounted } from "vue";
import { useGeneralStore } from "@/stores/generalStore";
const generalStore = useGeneralStore();
const loading = ref(true);
const { vibCount, tempCount, alarmsCount, machineCount, unakCount } =
  storeToRefs(generalStore);

/**
 * ! CHART PROP (DATA & OPTIONS): FOR BETTER UNDERSTANDING, WE ARE USING PROPS TO PASS DATA TO THE CHART COMPONENT. SO DATA VARIABLES DEFINITION WILL BE: CHART-TYPE_CARD-NUMBER_CHART-PROP, EXAMPLE: barC1ChartData && barC1ChartOptions, IN THIS EXAMPLE WE CAN SEE THAT WE ARE DEFINING THE PROPS TO THE bar-chart ON THE card-number-1.
 * * IF IN THE SAME CARD WE HAVE MORE THAN 1 SAME CHART TYPES, WE CAN DEFINE THEM BY WHAT THEY ARE SHOWING, EXAMPLE: CHART-TYPE_CHART-DEFINITION_CARD-NUMBER_CHART-PROP => barComparisonC1ChartData && barComparisonC1ChartOptions. IN THIS CASE, IS THE BAR CHART ON THE CARD ONE THAT COMPARES SOMETHING.
 */

/**
 * *BEGIN: CARD-2 CHARTS DATA
 */

//BEGIN: doughnutC2Chart
const doughnutC2ChartLabels = ref(["Temp", "Vib"]);
const doughnutC2ChartDatasets = ref([
  {
    label: "Count:",
    data: [vibCount, tempCount],
    backgroundColor: [
      Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
    ],
    borderColor: [Utils.CHART_COLORS.red, Utils.CHART_COLORS.yellow],
    hoverOffset: 4,
  },
]);
const doughnutC2ChartData = computed(() => ({
  labels: doughnutC2ChartLabels.value,
  datasets: doughnutC2ChartDatasets.value,
}));
const doughnutC2ChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    title: {
      display: true,
      position: "top",
      align: "center",
      padding: {
        bottom: -3,
      },
      text: "Total Alarms Types",
      font: {
        size: 12,
      },
    },
    legend: {
      position: "top",
      align: "center",
      labels: {
        usePointStyle: true,
      },
    },
  },
});
//END: doughnutC2Chart
//BEGIN: barC2Chart
const barC2ChartLabels = ref(["Week", "Week-1"]);
const barC2ChartDatasets = ref([
  {
    label: "Temp",
    data: [45, 55],
    borderColor: Utils.CHART_COLORS.red,
    backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    borderWidth: 2,
    borderRadius: 3,
    borderSkipped: false,
    grouped: true,
    maxBarThickness: 30,
    barPercentage: 0.5,
    categoryPercentage: 1,
  },
  {
    label: "Vib",
    data: [27, 63],
    borderColor: Utils.CHART_COLORS.yellow,
    backgroundColor: Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
    borderWidth: 2,
    borderRadius: 3,
    borderSkipped: false,
    grouped: true,
    maxBarThickness: 30,
    barPercentage: 0.5,
    categoryPercentage: 1,
  },
]);
const barC2ChartData = computed(() => ({
  labels: barC2ChartLabels.value,
  datasets: barC2ChartDatasets.value,
}));
const barC2ChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y",

  plugins: {
    title: {
      position: "top",
      align: "center",
      text: "Weekly Alarms Comparison",
      font: {
        size: 12,
      },
    },
    legend: {
      position: "top",
      align: "center",
      labels: {
        usePointStyle: true,
      },
    },
  },
});
//END: barC2Chart
//BEGIN: lineC2Chart
const lineC2ChartLabels = ref([
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
]);
const lineC2ChartDatasets = ref([
  {
    label: "Temp",
    data: [13, 17, 10, 20, 15, 13, 12],
    borderColor: Utils.CHART_COLORS.red,
    backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    fill: false,
    cubicInterpolationMode: "monotone",
    tension: 0.4,
  },
  {
    label: "Vib",
    data: [22, 8, 13, 12, 14, 12, 20],
    borderColor: Utils.CHART_COLORS.yellow,
    backgroundColor: Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
    fill: false,
    cubicInterpolationMode: "monotone",
    tension: 0.4,
  },
]);
const lineC2ChartData = computed(() => ({
  labels: lineC2ChartLabels.value,
  datasets: lineC2ChartDatasets.value,
}));
const lineC2ChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    title: {
      position: "top",
      align: "center",
      text: "Weekly Trend",
      font: {
        size: 12,
      },
    },
    legend: {
      position: "top",
      align: "center",
      labels: {
        usePointStyle: true,
      },
    },
  },
});
//END: lineC2Chart

/**
 * *END: CARD-2 CHARTS DATA
 */

/**
 * *BEGIN: CARD-3 LIST
 */

const oldPoints = ref([...machinePoints]);
const oldMachine = ref([...machines]);

const points = computed(() =>
  oldPoints.value.map(({ ID, Name }) => ({ ID, Name }))
);
const machine = computed(() =>
  oldMachine.value.map(({ id, name }) => ({ id, name }))
);
const listC3ListItem = ref([]);
const listC3ListTitle = ref([]);

const constantProperties = {
  icon: "circle-task-2",
  description: null,
  additionalText: null,
  additionalTextState: null,
};

onMounted(async () => {
  await generalStore.fetchAlarms();
  loading.value = false;

  const newArray = points.value.map((item) => ({
    ...constantProperties,
    listItemTitle: item.Name,
    key: item.ID,
  }));

  listC3ListItem.value = newArray;

  const newTitle = machine.value.map((item) => ({
    name: item.name,
    key: item.id,
  }));

  listC3ListTitle.value = newTitle;
});

/**
 * *END: CARD-3 LIST
 */
</script>

<template>
  <div v-if="!loading">
    <!-- eslint-disable vue/no-deprecated-slot-attribute -->
    <!-- Page Title -->
    <div class="h-10 flex flex-row justify-center">
      <ui5-title level="H2">General Report</ui5-title>
    </div>
    <!-- Grid Container -->
    <div class="h-[80vh] grid grid-cols-2 md:grid-cols-6 lg:grid-cols-9 lg:grid-rows-4 gap-5">
      <!-- Card6 - Total Alarms Count -->
      <div class="bg-white rounded-md order-1 shadow-xl md:col-start-2 lg:col-start-2">
        <RouterLink to="/alarms">
          <!-- Grid Container -->
          <div class="h-full p-4 grid grid-cols-2 grid-rows-2 hover:cursor-pointer">
            <!-- Header -->
            <div class="col-span-2 row-span-1 justify-self-start mx-3">
              <ui5-title class="" level="H4">Alarms</ui5-title>
              <ui5-title class="opacity-80 s" level="H6">Total </ui5-title>
            </div>
            <!-- BODY -->
            <!-- VALUE -->
            <div class="col-span-2 row-span-1 row-start-2 flex flex-row justify-around md:mx-2">
              <p class="text-yellow text-5xl md:text-6xl opacity-80 ">
                {{ alarmsCount }}
              </p>
              <!-- ICON -->
              <div class="md:mt-1.5 mt-3">
                <ui5-icon name="alert" class="h-[1.875rem] w-5 md:h-[3.75rem] md:w-10 opacity-50" />
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
      <!-- Card1 - New Alarms Count -->
      <div
        class="bg-white rounded-md shadow-xl order-first md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-1">
        <RouterLink to="/alarms">
          <!-- Grid Container -->
          <div class="h-full p-4 grid grid-cols-2 grid-rows-2 hover:cursor-pointer">
            <!-- Header -->
            <div class="col-span-2 row-span-1 justify-self-start lg:mx-3">
              <ui5-title class="" level="H4">New Alarms </ui5-title>
              <ui5-title class="opacity-80" level="H6">Unacknowledged
              </ui5-title>
            </div>
            <!-- BODY -->
            <!-- VALUE -->
            <div class="col-span-2 row-span-1 row-start-2 flex flex-row justify-around mx-2">
              <p v-if="unakCount == 0" class="text-5xl md:text-6xl opacity-80 text-greener">
                {{ unakCount }}
              </p>
              <p v-if="unakCount != 0" class="text-5xl md:text-6xl text-red">
                {{ unakCount }}
              </p>
              <!-- ICON -->
              <div class="mt-3 md:mt-1.5">
                <ui5-icon name="alert" class="h-[1.875rem] w-5 md:h-[3.75rem] md:w-10 opacity-50" />
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
      <!-- Card2 - Total Alarms -->
      <div
        class="bg-white rounded-md shadow-xl order-6 col-span-2 md:row-start-2 md:col-span-3 md:row-span-2 lg:row-start-2 lg:col-span-3 lg:row-span-2">
        <!-- Grid Container -->
        <div class="grid grid-cols-2 grid-rows-2 align-center h-full p-4">
          <!-- BODY -->
          <!-- Bar Chart -->
          <div class="col-span-1">
            <BarChart :chart-data="barC2ChartData" :chart-options="barC2ChartOptions" />
          </div>
          <div class="col-span-1 row-start-1">
            <DoughnutChart :chart-data="doughnutC2ChartData" :chart-options="doughnutC2ChartOptions" />
          </div>
          <div class="col-span-2 row-start-2">
            <LineChart :chart-data="lineC2ChartData" :chart-options="lineC2ChartOptions" />
          </div>
        </div>
      </div>
      <!-- Card3 - Machine N -->
      <div
        class="bg-white rounded-md shadow-xl order-7 col-span-2 md:row-start-2 md:col-span-3 md:row-span-2 lg:row-start-2 lg:col-span-3 lg:row-span-2 h-[100%]">
        <!-- Grid Container -->
        <div class="grid grid-cols-2 grid-rows-2 align-center h-full p-4 h-[100%]">
          <!-- BODY -->
          <div class="col-span-1 row-span-2 row-start-1">
            <ui5-list id="myList" growing="Scroll" header-text="Moinho Primário" class="h-[100%]">
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 1
                Temp</ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 2
                Vib</ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 3 g
                P</ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 4
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 5
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 6
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 7
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 8</ui5-li>
            </ui5-list>
          </div>
          <div class="col-span-2 row-span-2 row-start-1">
            <ui5-list id="myList" growing="Scroll" header-text="Moinho Secundário" class="h-[100%]">
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 1
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 2
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 3
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 4
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 5
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 6
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 7
              </ui5-li>
              <ui5-li class="border-b border-gray-200 bg-opacity-30 rounded-md" icon="circle-task-2">Sensor 8</ui5-li>
            </ui5-list>
          </div>
          <div class="col-span-2 row-start-2"></div>
        </div>
      </div>
      <!-- Card 4 Machines -->
      <div class="bg-white rounded-md shadow-xl order-4 md:col-start-4 lg:col-start-5 lg:row-start-1">
        <RouterLink to="/machines">
          <!-- Grid Container -->
          <div class="h-full p-4 grid grid-cols-2 grid-rows-2 hover:cursor-pointer">
            <!-- Header -->
            <div class="col-span-2 row-span-1 justify-self-start md:mx-3">
              <ui5-title class="" level="H4">Machines</ui5-title>
              <ui5-title class="opacity-80" level="H6">Total</ui5-title>
            </div>
            <!-- BODY -->
            <!-- VALUE -->
            <div class="col-span-2 row-span-1 row-start-2 flex flex-row justify-around text-greener">
              <p class="text-5xl md:text-6xl opacity-80">{{ machineCount }}</p>
              <!-- ICON -->
              <div class="mt-3 md:mt-1.5">
                <ui5-icon name="machine" class="h-[1.875rem] w-5 md:h-[3.75rem] md:w-10 opacity-50" />
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
      <!-- Card 5 Notes -->
      <div class="bg-white rounded-md shadow-xl order-5 md:col-start-1 md:row-start-4 lg:col-start-8 lg:row-start-1">
        <!-- Grid Container -->
        <div class="h-full p-4 grid grid-cols-2 grid-rows-2 hover:cursor-pointer">
          <!-- Header -->
          <div class="col-span-2 row-span-1 justify-self-start mx-3">
            <ui5-title class="" level="H4"> Todo </ui5-title>
            <ui5-title class="opacity-80" level="H6">Notes</ui5-title>
          </div>
          <!-- BODY -->
          <!-- VALUE -->
          <div class="col-span-2 row-span-1 row-start-2 flex flex-row justify-around">
            <p class="text-5xl md:text-6xl opacity-80 text-greener">3</p>
            <!-- ICON -->
            <div class="mt-3 md:mt-1.5">
              <ui5-icon name="notes" class="h-[1.875rem] w-5 md:h-[3.75rem] md:w-10 opacity-50" />
            </div>
          </div>
        </div>
      </div>
      <!-- Notes container -->
      <div
        class="bg-white rounded-md shadow-xl order-8 col-span-2 md:row-start-4 md:col-span-4 lg:row-start-2 lg:col-start-7 lg:row-span-2 lg:col-span-3">
        <!-- Grid Container -->
        <div class="p-4 h-full">
          <ui5-list id="myList1" mode="MultiSelect" header-text="Todos" class="h-[100%]" growing="Scroll">
            <ui5-li>Check for malfunction on Sensor 1</ui5-li>
            <ui5-li>Check if Moinho 3 is working Properly</ui5-li>
            <ui5-li>Set up a meeting with ROMAFE</ui5-li>
            <ui5-li>Clean chumaceira 7</ui5-li>
          </ui5-list>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading">
    <h1>LOADING DATA...</h1>
  </div>
</template>

<style>
ui5-li::part(icon) {
  color: #1a9850;
  opacity: 0.5;
}
</style>
