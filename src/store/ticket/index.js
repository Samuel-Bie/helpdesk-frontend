import { defineStore } from "pinia";
import { reactive, computed } from "vue";

import axios from "@/axios";

const userToken = localStorage.getItem("token");

const setup = () => {
  // state | data
  const allTickets = reactive([]);

  // getters | computed
  const tickets = computed(() => {
    return allTickets;
  });

  // actions | methods

  const index = () => {
    axios
      .get(`/tickets`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        allTickets.splice(0);
        allTickets.push(...data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        //
      });
  };

  const store = async (data) => {
    const response = await axios.post(
      `/tickets`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    ).then((response) => {
      const ticket = response.data
      addTicket(ticket);
      return ticket
    });

    return response;
  };

  const destroy = (id) => {};
  const update = (id, data) => {};
  const show = (id) => {};

  const addTicket = (ticket) => {
    allTickets.push(ticket);
  };

  const removeTicket = (ticket) => {
    const index = allTickets.indexOf(ticket);
    allTickets.splice(index, 1);
  };

  return {
    index,
    store,
    destroy,
    update,
    show,

    tickets,
    removeTicket,
  };
};

const useTicketStore = defineStore("ticket", setup);

export default useTicketStore;
