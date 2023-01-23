<!-- eslint-disable no-undef -->

<script >
import AlarmsHeader from "../components/AlarmsHeader.vue";
import alarms from "../data/alarms.json";
import points from "../data/points.json";
import machines from "../data/machines.json";
import FilterBar from "../components/FilterBar.vue";
import trendChart from "../components/trendChart.vue";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Badge";
import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import "@ui5/webcomponents-icons/dist/full-screen.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";

export default {
  name: "AlarmsView",
  data: function () {
    return {
      alarms: [...alarms],
      filteredAlarms: [...alarms],
      points: [...points],
      machines: [...machines],
      filterType: "All",
      currentAlarm: null,
      currentAlarmType: null,
      currentAlarmCreated: null,
      currentAlarmAknowledged: null,
      trend: Boolean,
      currentIsAcknowledged: Boolean,
      currentPointID: null,
      currentPoint: null,
      currentMachine: null,
      currentMachineID: null,
      currentTempDeviation: null,

      statusCriteriaMapping: {
        "High Warning": 0,
        "Low Warning": 1,
        "High Alarm": 2,
        "Low Alarm": 3,
      },
    };
  },
  methods: {
    setCurrentAlarm(item) {
      let type = this.getType(item);
      this.currentAlarm = item;
      this.currentAlarmType = type;
      this.currentIsAcknowledged = item.acknowledged;
      this.currentPointID = item.pointID;
      this.currentAlarmCreated = item.timestamps[0].value;
      this.currentAlarmAknowledged = item.timestamps[1].value;

      if (type === "Temperature") {
        this.trend = true;
      } else this.trend = false;
      this.currentPoint = this.points.filter(
        (item) => item.ID === this.currentPointID
      );
      this.currentMachineID = this.currentPoint.MachineID;
      this.currentMachine = this.machines.filter(
        (item) => item.ID === this.currentMachineID
      );
      this.currentTempDeviation = item.value.value - item.rule.value;
      if (this.currentTempDeviation < 0) {
        this.currentTempDeviation *= -1;
      }
    },

    getType(item) {
      let rule = item.rule.unit;
      let type = null;
      if (rule === "C") {
        type = "Temperature";
      } else type = "Vibration";
      return type;
    },

    getState(item) {
      let additionalText = item;
      if (additionalText) {
        additionalText = "Aknowledged";
      } else additionalText = "Unacknowledged";
      return additionalText;
    },
    getStateColor(item) {
      let atState = "";
      if (item) {
        atState = "Success";
      } else atState = "Error";
      return atState;
    },
    getTextColor(type) {
      switch (type) {
        case "High Warning":
          return "bold text-red-900  bg-opacity-50";
        case "Low Warning":
          return "bold text-yellow-500  bg-opacity-50";
        case "High Alarm":
          return "bold text-orange-600  bg-opacity-50";
        case "Low Alarm":
          return "bold text-pink-400  bg-opacity-50";
        case "True":
          return "bold text-green-600";
        case "False":
          return "bold text-red-600";
        default:
          return "0";
      }
    },
    getbgColor(type) {
      switch (type) {
        case "High Warning":
          return "bg-red-100";
        case "Low Warning":
          return "bg-yellow-100";
        case "High Alarm":
          return "bg-orange-100";
        case "Low Alarm":
          return "bg-pink-100";
        default:
          return "bg-white";
      }
    },
    sortAsc() {
      const sortedItems = this.filteredAlarms.sort((a, b) => {
        if (
          this.statusCriteriaMapping[a.status] >
          this.statusCriteriaMapping[b.status]
        ) {
          return 1;
        } else if (
          this.statusCriteriaMapping[a.status] <
          this.statusCriteriaMapping[b.status]
        ) {
          return -1;
        } else return 0;
      });
      this.filteredAlarms = sortedItems;
    },
    sortDesc() {
      const sortedItems = this.filteredAlarms.sort((a, b) => {
        if (
          this.statusCriteriaMapping[a.status] >
          this.statusCriteriaMapping[b.status]
        ) {
          return -1;
        } else if (
          this.statusCriteriaMapping[a.status] <
          this.statusCriteriaMapping[b.status]
        ) {
          return 1;
        } else return 0;
      });

      this.filteredAlarms = sortedItems;
    },

    filterVisibleItemsBySearch(search) {
      const filteredByType = this.filterItems(this.filterType, this.alarms); //filter alarms based on current filter type
      const items = filteredByType.filter((item) =>
        item.status.toLowerCase().startsWith(search)
      ); // filter items based on search

      this.filteredAlarms = items;
    },

    filter(value) {
      this.filterVisibleItemsBySearch(value);
    },

    filterknownAlarms(items) {
      return items.filter((alarm) => alarm.acknowledged);
    },

    filterUnknownAlarms(items) {
      return items.filter((alarm) => !alarm.acknowledged);
    },

    filterWarningAlarms(items) {
      return items.filter((alarm) => alarm.status.includes("Warning"));
    },
    filterAlarmsAlarms(items) {
      return items.filter((alarm) => alarm.status.includes("Alarm"));
    },
    applyFilter(filterType) {
      const alarms = this.filterItems(filterType, this.alarms);
      this.filteredAlarms = alarms;
      this.filterType = filterType;
    },

    filterItems(filterType, items) {
      // eslint-disable-next-line prettier/prettier
      let filteredAlarms = [];

      switch (filterType) {
        case "All":
          filteredAlarms = items;
          break;
        case "Aknowledged":
          filteredAlarms = this.filterknownAlarms(items);
          break;
        case "Unaknowledged":
          filteredAlarms = this.filterUnknownAlarms(items);
          break;
        case "Warnings":
          filteredAlarms = this.filterWarningAlarms(items);
          break;
        case "Alarms":
          filteredAlarms = this.filterAlarmsAlarms(items);
          break;
        default:
          filteredAlarms = items;
          break;
      }

      return filteredAlarms;
    },
    showMidColumn() {
      fcl.layout = "TwoColumnsMidExpanded";
    },

    closeMidColumn() {
      fcl.layout = "OneColumn";
    },

    fullscreenMidColumn() {
      fcl.layout = "MidColumnFullScreen";
    },
  },
  components: { AlarmsHeader, FilterBar, trendChart },
};
</script>

<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <div class="h-full">
    <div class="p-3">
      <AlarmsHeader
        :alarms="alarms"
        :knownCount="filterknownAlarms(alarms).length"
        :unknownCount="filterUnknownAlarms(alarms).length"
        :warningCount="filterWarningAlarms(alarms).length"
        :alarmCount="filterAlarmsAlarms(alarms).length"
        @tabPress="applyFilter"
      />
    </div>
    <main class="p-3">
      <div class="flex-1 h-[70vh]">
        <ui5-flexible-column-layout class="h-[70vh] shadow-xl" id="fcl">
          <div slot="startColumn">
            <FilterBar
              :filterType="filterType"
              class="border border-gray-300"
              @filter="filter"
              @sortAsc="sortAsc"
              @sortDesc="sortDesc"
            />
            <ui5-list no-data-text="No Data Available" id="col1list">
              <ui5-li
                v-for="item of filteredAlarms"
                icon="slim-arrow-right"
                icon-end
                :key="item.id"
                :description="`Type: ${getType(item)}`"
                :additional-text="getState(item.acknowledged)"
                :additional-text-state="getStateColor(item.acknowledged)"
                class="`border border-gray-200 bg-opacity-30 rounded-md"
                @click="
                  showMidColumn();
                  setCurrentAlarm(item);
                "
                >Status:
                <span :class="getTextColor(item.status)">{{
                  item.status
                }}</span>
              </ui5-li>
            </ui5-list>
          </div>

          <div v-if="currentAlarm && currentPoint" slot="midColumn">
            <div
              class="flex flex-row mx-3 h-[50px] border rounded-md shadow justify-start border"
            >
              <div
                class="flex basis-3/4 justify-start items-baseline ml-5 mt-2"
              >
                <ui5-title class="basis-1" level="H2"
                  >Alarm ID: {{ currentAlarm.id }}</ui5-title
                >
                <!--                 <ui5-title class="basis-1/6" level="H5"
                  >Type: {{ currentAlarmType }}</ui5-title
                >
                <ui5-title class="basis-1/6" level="H5"
                  >Status: {{ currentAlarm.status }}</ui5-title
                > -->
              </div>
              <div class="">
                <ui5-button
                  id="fullscreenMidColumn"
                  design="Transparent"
                  icon="full-screen"
                  title="Enter Fullscreen"
                  @click="fullscreenMidColumn"
                ></ui5-button>
                <ui5-button
                  @click="closeMidColumn"
                  id="closeMidColumn"
                  icon="decline"
                  design="Transparent"
                  title="Close Tab"
                ></ui5-button>
              </div>
            </div>
            <!-- ColBody -->
            <div
              class="grid grid-cols-2 grid-rows-2 gap-5 p-3 m-3 border rounded-md h-[60vh]"
            >
              <!-- Card Common Header -->
              <div class="bg-white rounded-md flex p-3 shadow-md">
                <ui5-list header-text="Alarm Information">
                  <ui5-li class="border-t">Type: {{ currentAlarmType }}</ui5-li>
                  <ui5-li class="border-t"
                    >Created: {{ currentAlarmCreated }}
                  </ui5-li>
                  <ui5-li v-show="currentIsAcknowledged" class="border-t"
                    >Aknowledged: {{ currentAlarmAknowledged }}
                  </ui5-li>
                  <ui5-li v-show="currentIsAcknowledged" class="border-t"
                    >Aknowledged by: {{ currentAlarm.signature }}
                  </ui5-li>
                </ui5-list>
              </div>
              <div class="bg-white rounded-md flex p-3 shadow-md">
                <ui5-list header-text="Point Information">
                  <ui5-li class="border-t"
                    >Machine: {{ currentMachine[0].name }}</ui5-li
                  >
                  <ui5-li class="border-t"
                    >Point: {{ currentPoint[0].Name }}</ui5-li
                  >
                  <ui5-li class="border-t"
                    >Description: {{ currentPoint[0].Description }}</ui5-li
                  >
                  <ui5-li v-if="trend" class="border-t">{{
                    currentPoint[0].OverallAlarm.Summary
                  }}</ui5-li>
                  <ui5-li v-if="!trend" class="border-t"
                    >Warning:
                    {{ currentPoint[0].Frequencies[0].WarningLevel }} Alarm:
                    {{ currentPoint[0].Frequencies[0].AlarmLevel }}</ui5-li
                  >
                </ui5-list>
              </div>
              <div
                class="p-3 bg-white col-span-2 rounded-md shadow-md"
              >
              <!-- Alarm Values if Trend -->
                <div class="flex flex-row" v-show="trend">
                  <div class="basis-1/3">
                    <ui5-list header-text="Point Values">
                      <ui5-li class="border-t"
                        >Alarm Value: {{ currentAlarm.value.value }} ℃</ui5-li
                      >
                      <ui5-li class="border-t"
                        >Deviation: {{ currentTempDeviation }} ℃</ui5-li
                      >
                      <ui5-li class="border-t"
                        >Source: {{ currentAlarm.source }}</ui5-li
                      >
                      <ui5-li v-if="!trend" class="border-t"
                        >Warning:
                        {{ currentPoint[0].Frequencies[0].WarningLevel }} Alarm:
                        {{ currentPoint[0].Frequencies[0].AlarmLevel }}</ui5-li
                      >
                    </ui5-list>
                  </div>
                  <!-- TRENDCHART -->
                  <div class="basis-2/3">
                    <trendChart />
                  </div>
                </div>
                <!-- Alarm Values if Dynamic -->
                <div v-show="!trend">this is dynamic</div>
              </div>
            </div>
          </div>
        </ui5-flexible-column-layout>
      </div>
    </main>
  </div>
</template>
