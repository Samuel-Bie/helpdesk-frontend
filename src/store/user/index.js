import { defineStore } from "pinia";
import { ref, computed } from "vue";

import axios from "@/axios";

const storedToken = localStorage.getItem("token");

const setup = () => {
  // State
  const token = ref("");
  const storedUser = ref("");

  // Getters | computed
  const user = computed(() => {
    if (!!storedUser.value) return JSON.parse(storedUser.value);

    const userData = localStorage.getItem("user");
    if (!!userData) return JSON.parse(userData);
    return false;
  });

  const userToken = computed(() => {
    if (!!token.value) return token.value;
    const userToken = localStorage.getItem("token");
    if (!!userToken) return userToken;
    return false;
  });

  const userIsAuth = computed(() => {
    if (!!token.value) return true;
    const userToken = localStorage.getItem("token");
    if (!!userToken) return true;
    return false;
  });

  // Actions | methods

  const storeLoggedInUser = (token_info, user_info) => {
    // Save the token to localStorage
    localStorage.setItem("token", token_info);

    // Save the user to localStorage
    const stringifiedUser = JSON.stringify(user_info);
    localStorage.setItem("user", stringifiedUser);

    // Save the token and user to the store state
    token.value = token_info;
    storedUser.value = stringifiedUser;

    const userToken = localStorage.getItem("token");

  };

  const logoutUser = () => {
    // Delete the token from localstorage
    localStorage.removeItem("token");

    // Delete the user from localstorage
    localStorage.removeItem("user");

    // To confirm that everything has been deleted
    localStorage.clear();

    // Delete the token and user from the store state
    token.value = null;
    storedUser.value = null;
  };

  const getUserInfo = async (id) => {
    const user = await axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return user;
  };

  return {
    token,
    userToken,
    storedUser,
    user,
    userIsAuth,

    getUserInfo,
    storeLoggedInUser,
    logoutUser,
  };
};

const useUserStore = defineStore("user", setup);

export default useUserStore;
