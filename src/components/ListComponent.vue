<script setup>
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js";
import { toRefs } from "vue";
import "@ui5/webcomponents-icons/dist/circle-task-2";

const props = defineProps({
  listTitle: {
    type: Array,
    default: () => [{}],
    required: true,
  },

  listItems: {
    type: Array,
    default: () => [{}],
    required: true,
  },
});

/*    UI5 LISTitem EXAMPLE 
{
        icon="slim-arrow-right"
        icon-start
        key="item.id"
        icon-end="true"
        description="`Type: ${getType(item)}`"
        additional-text="text"
        additional-text-state="Sucess/error" 
        }
        */

const { listItems, listTitle } = toRefs(props);
</script>

<template>
  <div>
    <ui5-list v-if="listTitle.length" :header-text="listTitle[0].name" no-data-text="No Data Available">
      <ui5-li v-for="item of listItems" :key="item.key" :icon="item.icon" :description="item.description"
        :additional-text="item.additionalText" :additional-text-state="item.additionalTextState"
        class="border-b border-gray-200 bg-opacity-30 rounded-md">
        {{ item.listItemTitle }}
      </ui5-li>
    </ui5-list>
  </div>
</template>

<style scoped>
ui5-li::part(icon) {
  color: #1a9850;
  opacity: 0.5;
}
</style>
