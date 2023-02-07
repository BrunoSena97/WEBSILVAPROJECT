<script setup>
import "@ui5/webcomponents-icons/dist/excel-attachment.js";
import "@ui5/webcomponents-icons/dist/sort-ascending.js";
import "@ui5/webcomponents-icons/dist/sort-descending.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents/dist/Input.js";

const props = defineProps({
  filterType: {
    type: String,
    default: "All",
  },
});
</script>

<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <div
    class="flex flex-wrap justify-between bg-white rounded-md align-middle bg-gray-100"
  >
    <div class="flex flex-auto justify-start items-center ml-3">
      <ui5-title level="H3">{{ props.filterType }}</ui5-title>
    </div>
    <div
      class="flex flex-auto justify-end p-1.5 max-w-100% flex-wrap mr-1 last:mr-0"
    >
      <ui5-input
        class="w-auto border flex-box border-gray-400 hover:border-black"
        placeholder="Search"
        @input="$emit('filter', $event.target.value)"
      >
        <ui5-icon class="flex-auto h-full" slot="icon" name="search"></ui5-icon>
      </ui5-input>

      <ui5-button
        icon="filter"
        design="Transparent"
        title="More Filters"
      ></ui5-button>
      <ui5-button
        icon="sort-descending"
        design="Transparent"
        title="Sort By Status-Descending"
        @click="$emit('sortDesc')"
      ></ui5-button>
      <ui5-button
        icon="sort-ascending"
        design="Transparent"
        title="Sort By Status-Ascending"
        @click="$emit('sortAsc')"
      ></ui5-button>
      <ui5-button icon="excel-attachment" design="Transparent"></ui5-button>
    </div>
  </div>
</template>

<style lang="css"></style>
