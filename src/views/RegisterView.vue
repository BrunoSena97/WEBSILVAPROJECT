<script setup>
import axios from "axios";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js";
const numcom = 1589844;


function fetch() {
  axios.get(`http://10.100.2.10:3300/pda/get/encabertas/numcom=${numcom}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
</script>

<template>
  <div>
    <button @click="fetch">click me</button>
  </div>

  <div class="h-[200px] w-[50%] bg-white">
    <ui5-list separators="None" growing="Scroll" class="card-content-child"
      style="width: 100%; height: 100%; margin-bottom: 0.75rem">
      <ui5-li image="../../../assets/images/avatars/man_avatar_1.png" description="User Researcher">Alain
        Chevalier</ui5-li>
      <ui5-li image="../../../assets/images/avatars/woman_avatar_1.png" description="Artist">Monique Legrand</ui5-li>
      <ui5-li image="../../../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Isabella
        Adams</ui5-li>
      <ui5-li image="../../../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Isabella
        Adams</ui5-li>
      <ui5-li image="../../../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Isabella
        Adams</ui5-li>
      <ui5-li image="../../../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Isabella
        Adams</ui5-li>
      <ui5-li image="../../../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Isabella
        Adams</ui5-li>
      <ui5-li image="../../../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Isabella
        Adams</ui5-li>
      <ui5-li image="../../../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Isabella
        Adams</ui5-li>
    </ui5-list>
  </div>
</template>
