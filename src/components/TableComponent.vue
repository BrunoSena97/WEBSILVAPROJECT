<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <ui5-table no-data-text="No Data">
    <ui5-table-column slot="columns">
      <ui5-label class="flex w-[100%] h-[100%]">Alarm</ui5-label>
    </ui5-table-column>

    <ui5-table-column slot="columns">
      <ui5-label class="flex w-[100%] h-[100%]">Created</ui5-label>
    </ui5-table-column>

    <ui5-table-column slot="columns">
      <ui5-label class="flex w-[100%] h-[100%]">Acknowledged</ui5-label>
    </ui5-table-column>

    <ui5-table-column slot="columns">
      <ui5-label class="flex w-[100%] h-[100%]"> Signature </ui5-label>
    </ui5-table-column>

    <ui5-table-column slot="columns">
      <ui5-label class="flex w-[100%] h-[100%]"> Status </ui5-label>
    </ui5-table-column>

    <ui5-table-row :key="item.key" v-for="item of filteredAlarms">
      <ui5-table-cell>
        <ui5-label class="flex w-[100%] h-[100%]">
          <b>{{ item.id }}</b>
        </ui5-label>
      </ui5-table-cell>
      <ui5-table-cell>
        <span class="flex w-[100%] h-[100%]">{{
          item.timestamps[0].value
        }}</span>
      </ui5-table-cell>
      <ui5-table-cell>
        <span class="flex w-[100%] h-[100%]">{{
          item.timestamps[1].value
        }}</span>
      </ui5-table-cell>
      <ui5-table-cell>
        <span class="flex w-[100%] h-[100%]">{{ item.signature }}</span>
      </ui5-table-cell>
      <ui5-table-cell>
        <span class="flex w-[100%] h-[100%]">{{ item.status }}</span>
      </ui5-table-cell>
    </ui5-table-row>
  </ui5-table>
</template>
