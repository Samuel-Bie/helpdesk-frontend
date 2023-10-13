import { defineStore, storeToRefs } from "pinia";
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

  const store = (data) => {
    const _this = this;
    axios
      .post(
        `${_this.API_URL}/api/tickets`,
        {
          ..._this.ticket,
        },
        {
          headers: {
            Authorization: `Bearer ${_this.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
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
    addTicket,
    removeTicket,
  };
};

const useTicketStore = defineStore("ticket", setup);

export default useTicketStore;
