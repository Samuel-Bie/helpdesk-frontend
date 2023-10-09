import { defineStore } from 'pinia';

const useTicketStore = defineStore('ticket', {
    state: () => ({
        allTickets: localStorage.getItem('allTickets') || null
    }),
    getters: {
        tickets: state => {
            return (
                state.allTickets
                ? JSON.parse(state.allTickets)
                : []
            );
        }
    },
    actions: {
        storeTickets(allTickets) {
            const stringifiedData = JSON.stringify(allTickets);
            localStorage.getItem('allTickets', allTickets)
            this.allTickets = stringifiedData;
        },
    }
});

export default useTicketStore;