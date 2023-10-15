<template>
  <div>
    <div class="card">
      <div class="header">
        <h2>All Tickets</h2>
      </div>
      <div class="body">
        <div class="table-responsive">
          <table
            class="table table-hover js-basic-example dataTable table-custom mb-0"
          >
            <thead class="thead-dark">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tickets" :key="index">
                <td>
                  <span
                    v-if="isMine(item)"
                    class="badge badge-success"
                    >Me</span
                  >

                  <span
                    v-else
                    class="badge badge-success"
                    >User</span
                  >

                {{ item.title }}</td>
                <td>{{ item.category.name }}</td>
                <td>{{ item.priority }}</td>
                <td>
                  <span v-if="item.status == 'open'" class="badge badge-warning"
                    >open</span
                  >
                  <span v-if="item.status == 'closed'" class="badge badge-info"
                    >closed</span
                  >
                  <span
                    v-if="item.status == 'on hold'"
                    class="badge badge-danger"
                    >on hold</span
                  >
                  <span
                    v-if="item.status == 'in progress'"
                    class="badge badge-success"
                    >on progress</span
                  >
                </td>

                <td>
                  <router-link
                    :to="{ name: 'tickets.show', params: { id: item.id } }"
                  >
                    <span class="badge badge-secondary">
                      <span class="icon-eye"></span>
                      details</span
                    >
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useTicketStore from "@/store/ticket";
import useUserStore from "@/store/user";

const userStore = useUserStore();
const ticketStore = useTicketStore();

ticketStore.index();

const tickets = ticketStore.tickets;

// action | methods
const isMine = (ticket) => {
  return userStore.user.id === ticket.user?.creator_user_id;
}

</script>
