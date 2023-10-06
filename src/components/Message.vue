<template>
  <transition-group name="bounce">
    <div
      v-for="message in messages"
      :key="message.id"
      :class="[
        message.role === 'bot'
          ? 'message__container--bot'
          : 'message__container--user',
        'message__container',
      ]"
    >
      <div class="chat__message">
        <svg-icon
          type="mdi"
          :path="message.role === 'bot' ? mdiRobotHappy : mdiAccount"
          size="32"
        ></svg-icon>

        <loader v-if="message.isLoading" />

        <p v-else class="message__text">
          {{ message.text }}
        </p>
      </div>

      <div
        class="chat__optionsContainer"
        v-show="message.options && !message.isLoading"
      >
        <span
          v-for="option in message.options"
          key="option.id"
          class="chat__option"
          @click="handleOptionClick(option.message)"
          >{{ option.message }}</span
        >
      </div>
    </div>
  </transition-group>
</template>

<script setup>
import { useChatbotStore } from "@/store/chatbotStore";
import { storeToRefs } from "pinia";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiRobotHappy, mdiAccount } from "@mdi/js";
import Loader from "./Loader.vue";

const emit = defineEmits(["sendAsMessage"]);

const chatbotStore = useChatbotStore();

const { messages } = storeToRefs(chatbotStore);

const handleOptionClick = (message) => emit("sendAsMessage", message);
</script>

<style scoped>
.message__container {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  gap: 8px;
}

.message__container--bot {
  transform-origin: bottom left;
}
.message__container--user {
  transform-origin: bottom right;
}

.chat__message {
  width: fit-content;
  max-width: 80%;
  overflow-wrap: break-word;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 14px;
  line-height: 1.4;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.message__container--bot .chat__message {
  background-color: var(--primary-color);
  color: var(--text-color-light);
  border-bottom-left-radius: 0;
}

.message__container--user .chat__message {
  background-color: var(--white);
  color: var(--text-color-dark);
  border-bottom-right-radius: 0;
  margin-left: auto;
  flex-direction: row-reverse;
}

.chat__optionsContainer {
  max-width: 80%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.chat__option {
  background-color: var(--accent-color);
  outline: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 8px 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-shadow: var(--shadow);
}

.chat__option:hover {
  background-color: var(--primary-color);
  color: var(--white);
}
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
