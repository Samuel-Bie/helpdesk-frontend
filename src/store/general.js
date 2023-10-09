import { defineStore } from 'pinia';

const useGeneralStore = defineStore('general', {
    state: () => ({
        API_URL: 'http://localhost'
    })
});

export default useGeneralStore;