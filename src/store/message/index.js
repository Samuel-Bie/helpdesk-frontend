import { defineStore } from "pinia";
import { reactive, computed } from "vue";

import axios from "@/axios";

const setup = () => {
  const userToken = localStorage.getItem("token");

  // state | data
  const allMessages = reactive([]);

  // getters | computed
  const messages = computed(() => {
    return allMessages;
  });

  // actions | methods

  const index = (ticket_id) => {

    axios
      .get(`tickets/${ticket_id}/messages`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        allMessages.splice(0);
        allMessages.push(...data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        //
      });
  };

  const store = async (ticket_id, data) => {
    const response = await axios
      .post(
        `tickets/${ticket_id}/messages`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        const message = response.data;
        addMessage(message);
        return message;
      });

    return response;
  };

  const destroy = (id) => {};
  const update = (id, data) => {};



  const addMessage = (message) => {
    allMessages.push(message);
  };

  const removeMessage = (message) => {
    const index = allMessages.indexOf(message);
    allMessages.splice(index, 1);
  };

  return {
    messages,


    index,
    store,
    destroy,
    update,
    removeMessage,
  };
};

const useMessageStore = defineStore("message", setup);

export default useMessageStore;
