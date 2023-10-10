import { defineStore } from 'pinia';

const useCategoryStore = defineStore('category', {
    state: () => ({
        allCategories: localStorage.getItem('allCategories') || null
    }),
    getters: {
        categories: state => {
            return (
                state.allCategories
                ? JSON.parse(state.allCategories)
                : []
            );
        }
    },
    actions: {
        storeCategories(allCategories) {
            const stringifiedData = JSON.stringify(allCategories);
            localStorage.getItem('allCategories', allCategories)
            this.allCategories = stringifiedData;
        },
    }
});

export default useCategoryStore;