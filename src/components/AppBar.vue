<script setup>
import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-fiori/dist/ShellBarItem";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { isAuthenticated, token } = storeToRefs(authStore);

const router = useRouter();

function logout() {
  authStore.$patch(() => {
    (isAuthenticated.value = false), (token.value = {});
    router.push("/login");
  });
}

function goHome() {
  router.push("/");
}

const profileRef = ref(null);

function togglePopover(event) {
  profileRef.value.showAt(event.detail.targetRef);
}

const props = defineProps({
  title: {
    type: String,
    default: "WebSilva",
  },
  logo: {
    type: String,
    default: "public/images/romafe-white.png",
  },
});

</script>
<!-- eslint-disable vue/no-deprecated-slot-attribute -->

<template>
  <div class="">
    <ui5-shellbar v-if="isAuthenticated" @profile-click="togglePopover" @logo-click="goHome" class="shadow"
      :primary-title="props.title" show-notifications notifications-count="22">
      <img slot="logo" :src="props.logo" />
      <ui5-avatar slot="profile"></ui5-avatar>
    </ui5-shellbar>
    <ui5-shellbar v-if="!isAuthenticated" :primary-title="props.title">
      <img slot="logo" :src="props.logo" />
    </ui5-shellbar>

    <ui5-popover v-if="isAuthenticated" ref="profileRef" placement-type="Bottom">
      <div class="popover-header">
        <ui5-title style="padding: 0.25rem 1rem 0rem 1rem">User</ui5-title>
      </div>

      <div class="popover-content">
        <ui5-list separators="None">
          <ui5-li icon="settings">Settings</ui5-li>
          <ui5-li @click="logout" icon="log">Sign out</ui5-li>
        </ui5-list>
      </div>
    </ui5-popover>
  </div>
</template>
