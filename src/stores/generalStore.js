import { ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import { storeToRefs } from "pinia";
import axios from "axios";

export const useGeneralStore = defineStore("general", () => {
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);
  const alarms = ref(null);
  const machines = ref(null);
  const points = ref(null);
  const allPoints = ref([]);
  const maxNumberOfAlarms = 100;
  const alarmsCount = ref(null);
  const vibCount = ref(0);
  const tempCount = ref(0);
  const machineCount = ref(0);
  const unakCount = ref(0);
  const akCount = ref(0);
  /*   const tempTrend = ref([]);
  const vibTrend = ref([]); */

  async function fetchAlarms() {
    if (alarmsCount.value === null) {
      const access_token = token.value.access_token;
      const AxiosInstance = axios.create({
        baseURL: "https://emeaservices.cmcrdc.com:50425/",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      });

      const resAlarms = await AxiosInstance.get("v2/alarms", {
        params: { maxNumberOfAlarms },
      });
      alarms.value = resAlarms.data;
      const resMachines = await AxiosInstance.get("v1/machines");
      machines.value = resMachines.data;
      await countAlarms();

      for (let machine of resMachines.data) {
        const resPoints = await AxiosInstance.get(
          `v1/machines/${machine.id}/points`
        );
        allPoints.value.push(resPoints.data);
      }
      await countMachines();
      points.value = allPoints.value;
    } else return;
  }

  function countAlarms() {
    alarmsCount.value = alarms.value.length;

    alarms.value.forEach((alarm) => {
      if (alarm.rule.unit === "C") {
        tempCount.value += 1;
      } else vibCount.value += 1;
    });

    alarms.value.forEach((alarm) => {
      if (!alarm.acknowledged) {
        unakCount.value += 1;
      } else akCount.value += 1;
    });
  }
  function countMachines() {
    machineCount.value = machines.value.length;
  }

  return {
    fetchAlarms,
    alarms,
    points,
    machines,
    tempCount,
    vibCount,
    machineCount,
    alarmsCount,
    unakCount,
  };
});
