<template>
  <div class="bot__container" v-show="chatbotStore.isChatOpen" :key="1">
    <div class="bot__header">
      <h1>Chatbot</h1>
      <svg-icon
        type="mdi"
        :path="mdiClose"
        class="header__closeBtn"
        size="28"
        @click="isChatOpen = false"
      ></svg-icon>
    </div>

    <div class="bot__messagesArea" ref="messageContainer">
      <message @sendAsMessage="sendMessage" />
    </div>
    <div class="bot__inputArea">
      <input
        class="inputArea__input"
        type="text"
        placeholder="Type the message..."
        ref="input"
        v-model="newMessage"
        @keyup.enter="sendMessage(newMessage)"
      />
      <button class="inputArea__btn" @click="sendMessage(newMessage)">
        <svg-icon
          type="mdi"
          :path="mdiSend"
          size="28"
          class="inputArea__icon"
        ></svg-icon>
      </button>
    </div>
  </div>

  <div
    :key="2"
    v-show="!chatbotStore.isChatOpen"
    class="bot__openBtn"
    @click="isChatOpen = true"
  >
    <svg-icon type="mdi" :path="mdiMessage" size="40"></svg-icon>
  </div>
</template>

<script setup>
import { useChatbotStore } from "@/store/chatbotStore";
import { storeToRefs } from "pinia";
import { ref, nextTick } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiSend, mdiMessage, mdiClose } from "@mdi/js";
import Message from "./Message.vue";

const chatbotStore = useChatbotStore();

const { isChatOpen } = storeToRefs(chatbotStore);

const newMessage = ref("");
const messageContainer = ref();
const input = ref();

async function getElements() {
  await nextTick();
  chatbotStore.getMessages();
  input.value.focus();
  messageContainer.value.scrollTo({
    left: 0,
    top: messageContainer.value.scrollHeight,
    behavior: "smooth",
  });
}

if (isChatOpen.value) {
  chatbotStore.getMessages();
}

chatbotStore.$subscribe((mutation, state) => {
  if (state.isChatOpen) {
    getElements();
  }
});

const sendMessage = (message) => {
  if (message.trim().length > 0) {
    chatbotStore.addMessage(message);
    chatbotStore.getResponse(message);
  }

  newMessage.value = "";
  input.value.focus();
};
</script>

<style scoped>
.bot__container {
  background-color: var(--white);
  height: 540px;
  width: 480px;
  border-radius: 12px;
  overflow: hidden;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow);
}

.bot__header {
  background-color: var(--primary-color);
  color: var(--text-color-light);
  padding: 16px;
  position: relative;
  text-align: center;
}

.header__closeBtn {
  position: absolute;
  bottom: 30%;
  right: 5%;
  cursor: pointer;
}

.bot__messagesArea {
  padding: 20px;
  background-color: var(--messageArea-bg-color);
  flex: 1;
  max-height: 80%;
  overflow: auto;
}

.bot__messagesArea::-webkit-scrollbar {
  width: 8px;
}

.bot__messagesArea::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.bot__messagesArea::-webkit-scrollbar-thumb {
  background-color: var(--accent-color);
  border-radius: 8px;
}

.bot__inputArea {
  background-color: var(--white);
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid var(--secondary-color);
}

.inputArea__input {
  flex: 1;
  padding: 16px;
}

.message__text {
  padding: 6px;
}

.inputArea__btn {
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.inputArea__icon {
  color: var(--secondary-color);
  transition: 0.2s ease-in-out;
}

.inputArea__icon:hover {
  color: var(--primary-color);
}

.bot__openBtn {
  position: absolute;
  bottom: 200px;
  right: 200px;
  color: var(--white);
  background-color: var(--primary-color);
  padding: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

@media (max-width: 680px) {
  .bot__container {
    width: 360px;
  }
  .bot__openBtn {
    bottom: 100px;
    right: 60px;
  }
}
</style>
