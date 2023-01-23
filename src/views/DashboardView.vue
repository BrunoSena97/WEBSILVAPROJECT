<script>
import "@ui5/webcomponents/dist/Card";
import AlertCard from "../components/AlertCard.vue";

export default {
  name: "DashboardView",
  data: function () {
    return {};
  },
  components: { AlertCard },
};
</script>

<template>
  <!-- Grid Container -->
  <div class="grid grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-4">
    <div class="lg:col-span-2">
      <div class="h-10 col-span-2 text-start mx-12">
        <ui5-title level="H2">General Report</ui5-title>
      </div>
      <div
        class="grid grid-cols-1 gap-4 justify-items-center md:grid-cols-3 lg:grid-cols-3 lg:content-center"
      >
        <AlertCard></AlertCard>
      </div>
    </div>
    <div class="h-10 col-span-2 row-start-2 text-start mx-12">
      <ui5-title level="H2">Today at a glance</ui5-title>
    </div>
    <div></div>
  </div>
</template>

<style>
/* Action alerts */
.ui5card-alert {
  min-width: 12rem;
  width: 12rem;
}

.ui5card-alert-content {
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  height: 6rem;
}

.ui5card-alert-icon {
  margin: 0 0.5rem;
}
</style>
