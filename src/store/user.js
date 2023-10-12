import { defineStore } from "pinia";
import { ref , computed} from "vue";

const setup = () => {
  // State
  const token = ref("");
  const storedUser = ref("");

  // Getters | computed
  const user = computed(() => {

    if (!!storedUser.value) {
      return JSON.parse(storedUser.value);
    }
    return storedUser.value;
  });

  const userIsAuth = computed(() => !!token.value);

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
  };

  const logoutUser = () => {
    // Delete the token from localstorage
    localStorage.removeItem("token");

    // Delete the user from localstorage
    localStorage.removeItem("user");

    // Delete the token and user from the store state
    token = null;
    storedUser = null;
  };

  return {
    token,
    storedUser,
    user,
    userIsAuth,
    storeLoggedInUser,
    logoutUser,
  };
};

const useUserStore = defineStore("user", setup);

export default useUserStore;