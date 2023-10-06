import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { messagesData } from "@/data/messagesData";

export const useChatbotStore = defineStore("chatbotStore", {
  state: () => {
    return {
      isChatOpen: true,
      responses: {
        "Order pizza": "Sure, I will order pizza. What else can I do for you?",
        "Set an alarm clock":
          "Ok, I will set an alarm clock. What else can I do for you?",
        "Show weather":
          "Ok, I will show current weather. What else can I do for you?",
      },
      responseText: "",
      messages: [],
    };
  },
  getters: {
    responsesKeys() {
      return Object.keys(this.responses);
    },
  },
  actions: {
    async getMessages() {
      setTimeout(() => {
        this.messages = messagesData;
      }, 100);

      setTimeout(() => {
        this.messages.map((message) => (message.isLoading = false));
      }, 1200);
    },

    async getResponse(message) {
      if (this.responsesKeys.includes(message)) {
        this.responseText = this.responses[message];
      } else {
        this.responseText = "Ok, I will do that. What else can I do for you?";
      }

      const newResponse = {
        id: uuidv4(),
        role: "bot",
        text: this.responseText,
        options: "",
        isLoading: true,
      };

      Promise.resolve()
        .then(() => delay(500))
        .then(() => this.messages.push(newResponse))
        .then(() => delay(1000))
        .then(() =>
          this.messages.map((message) => {
            if (message.id == newResponse.id) {
              message.isLoading = false;
            }
          })
        );

      function delay(duration) {
        return new Promise((resolve) => {
          setTimeout(resolve, duration);
        });
      }
    },

    addMessage(message) {
      this.messages.push({
        id: uuidv4(),
        role: "user",
        text: message,
        options: "",
      });
    },
  },
});
