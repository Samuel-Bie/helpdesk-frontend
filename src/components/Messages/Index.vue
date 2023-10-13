<template>
  <div>
    <div   v-for="item in messages" :key="item.id">
      <ShowMessage :message="item"/>
    </div>
  </div>
</template>

<script setup>
import ShowMessage from "@/components/Messages/Show.vue";

import { reactive, defineProps, computed } from "vue";

const props = defineProps({
  messages: {
    required: true,
  },
});

// computed
const messages = computed(() => {
  return props.messages.reverse();
});
</script>
