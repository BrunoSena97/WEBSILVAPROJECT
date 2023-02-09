<!-- eslint-disable no-undef -->
<script setup>
import "@ui5/webcomponents-icons/dist/full-screen.js";
import { ref } from "vue";
import { useGeneralStore } from "@/stores/generalStore";
import { storeToRefs } from "pinia";
import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
const generalStore = useGeneralStore();
const { machines } = storeToRefs(generalStore);
const machinesList = ref([...Object.values(machines.value)]);

function showMidColumn() {
  fcl.layout = "TwoColumnsMidExpanded";
}
function showEndColumn() {
  fcl.layout = "ThreeColumnsEndExpanded";
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
    <div class="m-3 bg-white rounded-md shadow-lg">
      <ui5-title class="p-3" level="H2">Machines</ui5-title>
    </div>
    <main class="p-3">
      <ui5-flexible-column-layout
        layout="TwoColumnsMidExpanded"
        id="fcl"
        class="h-[70vh] shadow-xl"
      >
        <!-- start column -->
        <div slot="startColumn">
          <ui5-list
            no-data-text="No Data Available"
            id="col1list"
            header-text="Machine List"
          >
            <ui5-li
              v-for="machine of machinesList"
              icon="slim-arrow-right"
              icon-end
              :key="machine.id"
              class="border border-gray-200 bg-opacity-30 rounded-md"
              @click="showMidColumn()"
            >
              {{ machine.name }}
            </ui5-li>
          </ui5-list>
        </div>

        <!-- middle column -->
        <div slot="midColumn">
          <div
            class="flex flex-row mx-3 h-[50px] border rounded-md shadow justify-start border"
          >
            <div class="flex basis-3/4 justify-start items-baseline ml-5 mt-2">
              <ui5-title class="basis-1" level="H2"
                >Moinho Secundário Schema</ui5-title
              >
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
          <div class="bg-white p-3 m-3 border rounded-md h-[500px]">
            <img
              @click="showEndColumn"
              class="h-full w-full object-contain"
              src="/public/images/scheme_1.png"
              alt=""
            />
          </div>
        </div>

        <!-- end column -->
        <div slot="endColumn">
					<div
            class="flex flex-row h-[50px] border rounded-md shadow justify-start border"
          >
            <div class="flex basis-3/4 justify-start items-baseline ml-5 mt-2">
              <ui5-title class="basis-1" level="H2"
                >Sensor 1</ui5-title
              >
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
					<div class="bg-white p-3 m-3 border rounded-md h-[500px]">
            <img
              class="h-full w-full object-contain"
              src="/public/images/line.png"
              alt=""
            />
          </div>
        </div>
      </ui5-flexible-column-layout>
    </main>
  </div>
</template>
