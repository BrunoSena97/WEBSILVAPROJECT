<script>
/* eslint-disable no-console */
import { defineComponent } from "vue";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/machine.js";
import "@ui5/webcomponents-icons/dist/notes.js";
import data from "../data/alarms.json";

export default defineComponent({
  name: "AlertCard",
  data: function () {
    return {
      data: data,
      cardData: [
        {
          key: "c1",
          title: "Alarms",
          subtitleText: "New Alarms",
          newValue: "0",
          icon: "alert",
          value: "0",
        },
        {
          key: "c2",
          title: "Machines",
          subtitleText: "Total",
          icon: "machine",
          value: "0",
        },
        {
          key: "c3",
          title: "Notes",
          subtitleText: "New Notes",
          newValue: "0",
          icon: "notes",
          value: "0",
        },
      ],
    };
  },
});
</script>

<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <ui5-card
    class="shadow-xl h-[200px] w-[200px]"
    v-for="card of cardData"
    :key="card.key"
  >
    <div>
      <!-- HEADER -->
      <ui5-card-header
        slot="header"
        :title-text="card.title"
        :subtitle-text="card.subtitleText"
      >
        <ui5-button design="Transparent" slot="action">View All</ui5-button>
      </ui5-card-header>
    </div>
    <!-- CONTENT -->
    <!-- VALUE -->
    <div class="flex justify-between mx-10 mt-4">
      <div class="">
        <p class="text-6xl opacity-80">
          {{ card.value }}
        </p>
      </div>
      <!-- ICON -->
      <div class="mt-2">
        <ui5-icon :name="card.icon" class="h-10 w-10 opacity-80 mt-1.5" />
      </div>
    </div>
  </ui5-card>
</template>
