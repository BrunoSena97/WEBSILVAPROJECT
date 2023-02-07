<script setup>
import { RouterView } from "vue-router";
import AppBar from "./components/AppBar.vue";
import "@ui5/webcomponents/dist/Assets.js";
</script>

<template>
  <!-- APP -->
  <div class="h-screen bg-gray-200">
    <!-- APPBAR -->
    <AppBar title="WebSilva" />
    <!-- APP CONTENT -->
    <div class="h-[calc(100vh-44px)]">
      <div class="px-12 py-5">
        <RouterView />
      </div>
    </div>
  </div>
</template>
