<script>
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";

export default {
  name: "AlarmsHeader",
  props: {
    alarms: { type: Array },
    knownCount: { type: Number, default: 0 },
    unkownCount: { type: Number, default: 0 },
    warningCount: { type: Number, default: 0 },
    alarmCount: { type: Number, default: 0 },
  },
  data: function () {
    return {};
  },
};
</script>

<template>
  <header class="bg-white border rounded-xl  divide-y divide-solid divide-gray-400 shadow-lg">
    <div class="h-14 flex items-center ml-5">
      <ui5-title level="H3">Alarms</ui5-title>
    </div>
    <div class="">
      <ui5-tabcontainer
        class="w-[100%] px-2 h-16"
        fixed
        collapsed
        @tabSelect="
          $emit('tabPress', $event.detail.tab.getAttribute('data-filter-type'))
        "
      >
        <ui5-tab
          data-filter-type="All"
          text="All Alarms"
          :additional-text="alarms.length"
        ></ui5-tab>
        <ui5-tab-separator></ui5-tab-separator>
        <ui5-tab
          data-filter-type="Aknowledged"
          text="Aknowledged"
          :additional-text="knownCount"
        ></ui5-tab>
        <ui5-tab-separator></ui5-tab-separator>
        <ui5-tab
          data-filter-type="Unaknowledged"
          text="Unaknowledged"
          :additional-text="unkownCount"
        ></ui5-tab>
        <ui5-tab-separator></ui5-tab-separator>
        <ui5-tab
          data-filter-type="Warnings"
          text="Warnings"
          :additional-text="warningCount"
        ></ui5-tab>
        <ui5-tab-separator></ui5-tab-separator>
        <ui5-tab
          data-filter-type="Alarms"
          text="Alarms"
          :additional-text="alarmCount"
        ></ui5-tab>
      </ui5-tabcontainer>
    </div>
  </header>
</template>
