<template>
  <div>
    <div class="card">
      <div class="body">
        <form class="needs-validation" @submit.prevent="sendMessage">
          <div class="form-group">
            <label for="exampleFormControlTextarea1"
              >Type below your message</label
            >
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
              v-model="message.content"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="exampleFormControlInput1">Image url</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="message.image"
            />
          </div>

          <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from "vue";

import useMessageStore from "@/store/message";


const emit = defineEmits(['newMessage'])


const messageStore = useMessageStore();

const message = reactive({
  content: "",
  image:
    "https://www.kasandbox.org/programming-images/avatars/duskpin-seedling.png",
});

const props = defineProps({
  ticket: {
    required: true,
  },
});


// Actions | Methods

const sendMessage = async () => {
  messageStore.store(
    props.ticket.id, message
  ).then((result) => {
    message.content = ""
    emit('newMessage', result)
  })


}
</script>
