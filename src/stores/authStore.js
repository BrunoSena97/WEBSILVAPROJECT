import { ref, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref({
    userName: "rdcemea\\ibrain",
    password: "A(r]1N_e~5B@j#9T)x?9M*l?9",
  });
  const token = ref({
    access_token: null,
    token_type: null,
    expires_in: 0,
    refresh_token: null,
  });

  async function fetchToken() {
    const res = await axios.post(
      "https://emeaservices.cmcrdc.com:50425/token",
      new URLSearchParams({
        username: user.value.userName,
        password: user.value.password,
        grant_type: "password",
      })
    );
    token.value = {
      access_token: res.data.access_token,
      token_type: res.data.token_type,
      expires_in: res.data.expires_in,
      refresh_token: res.data.refresh_token,
    };
    isAuthenticated.value = true;
  }

  async function refreshToken() {
    const res = await axios.post(
      "https://emeaservices.cmcrdc.com:50425/token",
      new URLSearchParams({
        refresh_token: token.value.refresh_token,
        grant_type: "refresh_token",
      })
    );
    token.value = {
      access_token: res.data.access_token,
      token_type: res.data.token_type,
      expires_in: res.data.expires_in,
      refresh_token: res.data.refresh_token,
    };
  }

  watch(
    token,
    (token) => {
      if (!token || !token.value) return;
      const { expires_in } = token.value;
      const remainingTime = expires_in - Date.now();
      if (remainingTime < 60 * 1000) {
        refreshToken();
      }
    },
    { immediate: true }
  );

  return {
    isAuthenticated,
    user,
    token,
    fetchToken,
    refreshToken,
  };
});
