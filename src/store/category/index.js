import { defineStore } from "pinia";
import { reactive, computed } from "vue";

import axios from "@/axios";

const setup = () => {
  const userToken = localStorage.getItem("token");

  // state | data
  const allCategories = reactive([]);

  // getters | computed
  const categories = computed(() => {
    return allCategories;
  });

  // actions | methods
  const index = () => {
    axios
      .get(`/categories`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        allCategories.splice(0);
        allCategories.push(...data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        //
      });
  };

  return {
    index,
    categories,
  };
};

const useCategoryStore = defineStore("category", setup);

export default useCategoryStore;
