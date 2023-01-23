<script>
import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-fiori/dist/ShellBarItem";
import "@ui5/webcomponents-icons/dist/employee.js";

export default {
  name: "AppBar",

  props: {
    title: {
      type: String,
      default: "WebSilva",
    },
    logo: {
      type: String,
      default: "public/images/logo.svg",
    },
  },
  methods: {
    handleHomeButtonPress() {
      // handle home button press event
    },
  },
};
</script>
<!-- eslint-disable vue/no-deprecated-slot-attribute -->

<template>
  <div class="">
  <ui5-shellbar class="shadow"
    :primary-title="title"
    show-notifications
    notifications-count="22"
  >
    <img slot="logo" :src="logo" />

    <ui5-avatar slot="profile"></ui5-avatar>
  </ui5-shellbar>
</div>
</template>
