<template>
  <div>
    <div class="card">
      <div class="header">
        <h2>Create Ticket</h2>
      </div>
      <div class="body">
        <form class="needs-validation" @submit.prevent="submitTicket">
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="validationCustom01">Ticket Title</label>
              <input
                type="text"
                class="form-control"
                required
                v-model="ticket.title"
              />
            </div>

            <div class="col-md-3 mb-3">
              <label for="validationCustom04">Category</label>
              <select
                class="custom-select"
                id="validationCustom04"
                required
                v-model="ticket.category"
              >
                <option
                  v-for="item in categoryStore.categories"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>

            <div class="col-md-3 mb-3">
              <label for="validationCustom04">Priority</label>
              <select
                class="custom-select"
                id="validationCustom04"
                required
                v-model="ticket.priority"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
            <div class="col-md-12 mb-3">
              <label for="validationCustom02">Image URL</label>
              <input
                type="text"
                class="form-control"
                id="validationCustom02"
                v-model="ticket.image"
              />
            </div>
            <div class="col-md-12 mb-3">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="ticket.description"
              ></textarea>
            </div>
          </div>
          <button class="btn btn-primary" type="submit">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import useTicketStore from "@/store/ticket";
import useCategoryStore from "@/store/category";

const router = useRouter()
const ticketStore = useTicketStore();
const categoryStore = useCategoryStore();

// data | state
const ticket = reactive({
  title: "",
  category: "",
  priority: "",
  image: "https://www.kasandbox.org/programming-images/avatars/duskpin-seedling.png",
  description: "",
  status: "open",
});

// Actions | methods
const submitTicket = async () => {
  const newTicket = await ticketStore.store(ticket);
  // named route with params to let the router build the url
  router.push({ name: "tickets.show", params: { id: newTicket.id } });
};

// Hooks handling

onMounted(() => {
  // fetch categories
  categoryStore.index();
});
</script>
