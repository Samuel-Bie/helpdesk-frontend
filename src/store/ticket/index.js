import { defineStore } from "pinia";
import { reactive, computed } from "vue";

import axios from "@/axios";

const setup = () => {
  const userToken = localStorage.getItem("token");

  // state | data
  const allTickets = reactive([]);

  // getters | computed
  const tickets = computed(() => {
    return allTickets;
  });

  // actions | methods

  const index = () => {
    console.log(userToken);
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
    const response = await axios
      .post(
        `/tickets`,
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
        const ticket = response.data;
        addTicket(ticket);
        return ticket;
      });

    return response;
  };

  const destroy = async (id) => {
    const result = await axios
      .delete(`/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        removeTicket(id);
        return true;
      });

    return result;
  };
  const update = (id, data) => {};
  const show = async (id) => {
    const localTicket = allTickets.find((ticket) => ticket.id === id);

    if (localTicket) return localTicket;
    const databaseTicket = await axios
      .get(`/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return databaseTicket;
  };

  const showFullHistory = async (id) => {
    const databaseTicket = await axios
      .get(`/tickets/${id}/history`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return databaseTicket;
  };

  const addTicket = (ticket) => {
    allTickets.push(ticket);
  };

  const removeTicket = (id) => {
    const updatedTickets = allTickets.filter((ticket) => ticket.id !== id);

    allTickets.splice(0);
    allTickets.push(...updatedTickets);
  };

  return {
    index,
    store,
    destroy,
    update,

    show,
    showFullHistory,

    tickets,
    removeTicket,
  };
};

const useTicketStore = defineStore("ticket", setup);

export default useTicketStore;
