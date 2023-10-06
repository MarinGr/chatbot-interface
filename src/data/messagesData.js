import { v4 as uuidv4 } from "uuid";

export const messagesData = [
  {
    id: uuidv4(),
    role: "bot",
    text: "Hello, what can I do for you?",
    options: [
      { id: uuidv4(), message: "Order pizza" },
      { id: uuidv4(), message: "Set an alarm clock" },
      { id: uuidv4(), message: "Show weather" },
    ],
    isLoading: true,
  },
];
