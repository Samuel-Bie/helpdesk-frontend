<template>
  <div>
    <div class="card">
      <div class="header">
        <h2>Ticket details</h2>
        <hr class="my-0" />
      </div>
      <div class="body">
        <div class="row">
          <div class="col-md-8">
            <p><strong>Title: </strong> {{ data.ticket.title }}</p>
            <p><strong>Category: </strong> {{ data.ticket.category?.name }}</p>
            <p><strong>Priority: </strong> {{ data.ticket.priority }}</p>
            <p><strong>Status: </strong> {{ data.ticket.status }}</p>
            <p><strong>Owner: </strong> {{ data.ticket.user?.name }}</p>
          </div>

          <div class="col-md-4">
            <strong>Attached image: </strong>
            <br>
            <img :src="data.ticket.image" />
          </div>
        </div>
        <hr class="my-0" />
        <p>
          <strong>Description: </strong> <br />
          {{ data.ticket.description }}
        </p>

        <p v-if="!!data.ticket.feedback_notes">
          <strong>Feedback: </strong> <br />
          {{ data.ticket.feedback_notes }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, reactive } from "vue";
import useTicketStore from "@/store/ticket";
import useUserStore from "@/store/user";

const ticketStore = useTicketStore();
const userStore = useUserStore();

const props = defineProps({
  id: {
    required: true,
  },
});

const data = reactive({
  ticket: {},
});

// Lifecycle hooks
onMounted(async () => {
  data.ticket = await ticketStore.show(props.id);
  userStore.getUserInfo(data.ticket.creator_user_id).then((result) => {
    data.ticket.user = result;
  });
});
</script>
