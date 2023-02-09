<script setup>
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";

const props = defineProps({
  machines: { type: Array },
});
</script>

<template>
  <header
    class="bg-white border rounded-xl divide-y divide-solid divide-gray-400 shadow-lg"
  >
    <div class="h-14 flex items-center ml-5">
      <ui5-title level="H3">Machines</ui5-title>
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
          v-for="machine in props.machines"
          :key="machine.id"
          :data-filter-type="machine.id"
          :text="machine.name"
        >
        </ui5-tab>
      </ui5-tabcontainer>
    </div>
  </header>
</template>
