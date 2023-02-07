<!-- eslint-disable no-undef -->

<script setup>
import AlarmsHeader from "../components/AlarmsHeader.vue";
import FilterBar from "../components/FilterBar.vue";
import { ref } from "vue";
import { useGeneralStore } from "@/stores/generalStore";
import { storeToRefs } from "pinia";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Badge";
import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import "@ui5/webcomponents-icons/dist/full-screen.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";
import { toRaw } from "vue";
const generalStore = useGeneralStore();
const { alarms, points, machines } = storeToRefs(generalStore);

const alarmsList = ref(alarms);
const filteredAlarms = ref(alarms);
const pointsList = ref(points);
const machinesList = ref(machines);
const filterType = ref("All");
const currentAlarm = ref(null);
const currentAlarmType = ref(null);
const currentAlarmCreated = ref(null);
const currentAlarmAknowledged = ref(null);
const trend = ref(Boolean);
const currentIsAcknowledged = ref(Boolean);
const currentPointID = ref(null);
const currentPoint = ref(null);
const currentMachine = ref(null);
const currentMachineID = ref(null);
const currentDeviation = ref(null);
const statusCriteriaMapping = ref({
  "High Warning": 0,
  "Low Warning": 1,
  "High Alarm": 2,
  "Low Alarm": 3,
});

function setCurrentAlarm(item) {
  console.log("this is the Current Alarm:", item);
  let type = getType(item);
  console.log("this is the type:", type);
  currentAlarm.value = item;
  console.log("this is the current alarm:", currentAlarm.value);
  currentAlarmType.value = type;
  console.log("this is the type value:", currentAlarmType.value);
  currentIsAcknowledged.value = item.acknowledged;
  console.log("this is the if aknowledged:", currentIsAcknowledged.value);
  currentPointID.value = item.pointID;
  console.log("this is the Current Point:", currentPointID.value);
  currentAlarmCreated.value = item.timestamps[0].value;
  console.log("this is the alarm created date:", currentAlarmCreated.value);
  currentAlarmAknowledged.value = item.timestamps[1].value;
  console.log("this is the alarm aknowledged date:", currentAlarmAknowledged.value);

  if (type === "Temperature") {
    trend.value = true;
  } else trend.value = false;

  currentDeviation.value = item.value.value - item.rule.value;
  if (currentDeviation.value < 0) {
    currentDeviation.value *= -1;
  }
  setCurrentPoint(currentPointID.value);
  setCurrentMachine(currentMachineID.value);
}

function setCurrentPoint(currentPointID) {
  const flatPoints = Object.values(pointsList.value).flat();
  console.log("This is the raw value of the pointsList point:", toRaw(pointsList.value));
  console.log("This is the value of the pointsList point:", pointsList.value);
  console.log("This is the  TYPEOF pointsList point:", typeof toRaw(pointsList.value));
  console.log("This is the pointsList after toRaw Object.Values:", flatPoints);
  currentPoint.value = flatPoints.find(point => point.ID === currentPointID);
  console.log("This is the value of the current Point:", currentPoint.value);
  currentMachineID.value = currentPoint.value.MachineID;
  console.log("This is the value of the current machine id:", currentMachineID.value);
}

function setCurrentMachine() {
  console.log("This is the value of the Machine List:", machinesList.value);
  console.log("This is the raw value of the Machine List:", toRaw(machinesList.value));
  console.log("This is the typeOf of the Machine List:", toRaw(machinesList.value));

  machinesList.value.forEach((machine) => {
    console.log("This is the value of the Machine id:", machine.id);
    console.log("This is the value of the Machine name", machine.name);
    if (machine.id === currentMachineID.value) {
      currentMachine.value = machine;
    }
    console.log("This is the Current Machine value", toRaw(currentMachine.value));
  });
}

function getType(item) {
  let rule = item.rule.unit;
  let type = null;
  if (rule === "C") {
    type = "Temperature";
  } else type = "Vibration";
  return type;
}

function getState(item) {
  let additionalText = item;
  if (additionalText) {
    additionalText = "Aknowledged";
  } else additionalText = "Unacknowledged";
  return additionalText;
}

function getStateColor(item) {
  let atState = "";
  if (item) {
    atState = "Success";
  } else atState = "Error";
  return atState;
}

function getTextColor(type) {
  switch (type) {
    case "High Warning":
      return "bold text-red  bg-opacity-50";
    case "Low Warning":
      return "bold text-yellow  bg-opacity-50";
    case "High Alarm":
      return "bold text-orange  bg-opacity-50";
    case "Low Alarm":
      return "bold text-pink-400  bg-opacity-50";
    case "True":
      return "bold text-green";
    case "False":
      return "bold text-red";
    default:
      return "0";
  }
}

function sortAsc() {
  const sortedItems = filteredAlarms.value.sort((a, b) => {
    if (
      statusCriteriaMapping.value[a.status] >
      statusCriteriaMapping.value[b.status]
    ) {
      return 1;
    } else if (
      statusCriteriaMapping.value[a.status] <
      statusCriteriaMapping.value[b.status]
    ) {
      return -1;
    } else return 0;
  });
  filteredAlarms.value = sortedItems;
}
function sortDesc() {
  const sortedItems = filteredAlarms.value.sort((a, b) => {
    if (
      statusCriteriaMapping.value[a.status] >
      statusCriteriaMapping.value[b.status]
    ) {
      return -1;
    } else if (
      statusCriteriaMapping.value[a.status] <
      statusCriteriaMapping.value[b.status]
    ) {
      return 1;
    } else return 0;
  });
  filteredAlarms.value = sortedItems;
}
function filterVisibleItemsBySearch(search) {
  const filteredByType = filterItems(filterType.value, alarmsList.value); //filter alarms based on current filter type
  const items = filteredByType.filter((item) =>
    item.status.toLowerCase().startsWith(search)
  ); // filter items based on search

  filteredAlarms.value = items;
}
function filter(value) {
  filterVisibleItemsBySearch(value);
}

function filterknownAlarms(items) {
  return items.filter((alarm) => alarm.acknowledged);
}

function filterUnknownAlarms(items) {
  return items.filter((alarm) => !alarm.acknowledged);
}

function filterWarningAlarms(items) {
  return items.filter((alarm) => alarm.status.includes("Warning"));
}
function filterAlarmsAlarms(items) {
  return items.filter((alarm) => alarm.status.includes("Alarm"));
}
function applyFilter(type) {
  const alarms = filterItems(type, alarmsList.value);
  filteredAlarms.value = alarms;
  filterType.value = type;
}

function filterItems(type, items) {
  // eslint-disable-next-line prettier/prettier
  let filteredAlarms = [];

  switch (type) {
    case "All":
      filteredAlarms = items;
      break;
    case "Aknowledged":
      filteredAlarms = filterknownAlarms(items);
      break;
    case "Unaknowledged":
      filteredAlarms = filterUnknownAlarms(items);
      break;
    case "Warnings":
      filteredAlarms = filterWarningAlarms(items);
      break;
    case "Alarms":
      filteredAlarms = filterAlarmsAlarms(items);
      break;
    default:
      filteredAlarms = items;
      break;
  }

  return filteredAlarms;
}
function showMidColumn() {
  fcl.layout = "TwoColumnsMidExpanded";
}

function closeMidColumn() {
  fcl.layout = "OneColumn";
}

function fullscreenMidColumn() {
  fcl.layout = "MidColumnFullScreen";
}
</script>

<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <div class="h-full">
    <div class="p-3">
      <AlarmsHeader :alarms="alarmsList" :knownCount="filterknownAlarms(alarmsList).length"
        :unknownCount="filterUnknownAlarms(alarmsList).length" :warningCount="filterWarningAlarms(alarmsList).length"
        :alarmCount="filterAlarmsAlarms(alarmsList).length" @tabPress="applyFilter" />
    </div>
    <main class="p-3">
      <div class="flex-1 h-[70vh]">
        <ui5-flexible-column-layout class="h-[70vh] shadow-xl" id="fcl">
          <div slot="startColumn">
            <FilterBar :filterType="filterType" class="border border-gray-300" @filter="filter" @sortAsc="sortAsc"
              @sortDesc="sortDesc" />
            <ui5-list no-data-text="No Data Available" id="col1list">
              <ui5-li v-for="item of filteredAlarms" icon="slim-arrow-right" icon-end :key="item.id"
                :description="`Date: ${item.timestamps[0].value}`" :additional-text="getState(item.acknowledged)"
                :additional-text-state="getStateColor(item.acknowledged)"
                class="border border-gray-200 bg-opacity-30 rounded-md" @click="
  showMidColumn();
setCurrentAlarm(item);
                ">Status:
                <span :class="getTextColor(item.status)">
                  {{ item.status }}
                </span>
                |
                <span :class="getTextColor(item.status)">
                  {{ getType(item) }}
                </span>
              </ui5-li>
            </ui5-list>
          </div>

          <div v-if="currentAlarm && currentPoint" slot="midColumn">
            <div class="flex flex-row mx-3 h-[50px] border rounded-md shadow justify-start border">
              <div class="flex basis-3/4 justify-start items-baseline ml-5 mt-2">
                <ui5-title class="basis-1" level="H2">Alarm ID: {{ currentAlarm.id }}</ui5-title>
              </div>
              <div class="">
                <ui5-button id="fullscreenMidColumn" design="Transparent" icon="full-screen" title="Enter Fullscreen"
                  @click="fullscreenMidColumn"></ui5-button>
                <ui5-button @click="closeMidColumn" id="closeMidColumn" icon="decline" design="Transparent"
                  title="Close Tab"></ui5-button>
              </div>
            </div>
            <!-- ColBody -->
            <div class="grid grid-cols-2 grid-rows-2 gap-5 p-3 m-3 border rounded-md h-[60vh]">
              <!-- Card Common Header -->
              <div class="bg-white rounded-md flex p-3 shadow-md">
                <ui5-list header-text="Alarm Information">
                  <ui5-li class="border-t">Type: {{ currentAlarmType }}</ui5-li>
                  <ui5-li class="border-t">Created: {{ currentAlarmCreated }}
                  </ui5-li>
                  <ui5-li v-show="currentIsAcknowledged" class="border-t">Aknowledged: {{ currentAlarmAknowledged }}
                  </ui5-li>
                  <ui5-li id="unak" v-show="!currentIsAcknowledged" class="border-t">UNAKNOWLEDGED
                  </ui5-li>
                  <ui5-li v-show="currentIsAcknowledged" class="border-t">Aknowledged by: {{ currentAlarm.signature }}
                  </ui5-li>
                </ui5-list>
              </div>
              <div class="bg-white rounded-md flex p-3 shadow-md">
                <ui5-list header-text="Point Information">
                  <ui5-li class="border-t">Machine: {{ currentMachine.name }}</ui5-li>
                  <ui5-li class="border-t">Point: {{ currentPoint.Name }}</ui5-li>
                  <ui5-li class="border-t">Description: {{ currentPoint.Description }}</ui5-li>
                  <ui5-li v-if="trend" class="border-t">Type: {{
                    currentPoint.OverallAlarm.TypeName
                  }}</ui5-li>
                  <ui5-li v-if="!trend" class="border-t">Warning:
                    {{ currentPoint.Frequencies[0].WarningLevel }} Alarm:
                    {{ currentPoint.Frequencies[0].AlarmLevel }}</ui5-li>
                </ui5-list>
              </div>
              <div class="p-3 bg-white col-span-2 rounded-md shadow-md">
                <!-- Alarm Values if Trend -->
                <div class="flex flex-row" v-show="trend">
                  <div class="basis-1/3">
                    <ui5-list header-text="Point Values">
                      <ui5-li class="border-t">Alarm Value: {{ currentAlarm.value.value }} ℃</ui5-li>
                      <ui5-li class="border-t">Deviation: {{ currentDeviation }} ℃</ui5-li>
                      <ui5-li class="border-t">Source: {{ currentAlarm.source }}</ui5-li>
                    </ui5-list>
                  </div>
                  <!-- TRENDCHART -->
                  <div class="basis-2/3"></div>
                </div>
                <!-- Alarm Values if Dynamic -->
                <div class="flex flex-row" v-show="!trend">
                  <div class="basis-1/3">
                    <ui5-list header-text="Point Values">
                      <ui5-li class="border-t">Alarm Value: {{ currentAlarm.value.value }}g P</ui5-li>
                      <ui5-li class="border-t">Deviation: {{ currentDeviation }} g P</ui5-li>
                      <ui5-li class="border-t">Source: {{ currentAlarm.source }}</ui5-li>
                    </ui5-list>
                  </div>
                  <!-- TRENDCHART -->
                  <div class="basis-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </ui5-flexible-column-layout>
      </div>
    </main>
  </div>
</template>

<style>
#unak::part(title) {
  color: red;
}
</style>