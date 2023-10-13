<template>
  <div>
    <div class="card">
      <div class="card-body">
        <p>{{ message.content }}</p>
        <footer class="blockquote-footer">
          {{ message.full_user_info.name }}
          <cite title="Source Title">at {{ dateTime }}</cite>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps, computed } from "vue";

import useUserStore from "@/store/user";
import useTicketStore from "@/store/ticket";

const props = defineProps({
  message: {
    required: true,
  },
});

const message = computed(() => {
  return props.message;
});

const dateTime = computed(() => {
  const date = props.message.created_at;
  return  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: '2-digit',
  }).format(new Date(date));
});
</script>
