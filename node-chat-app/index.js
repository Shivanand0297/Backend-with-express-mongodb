import { ChatRoom } from "./chatRoom.js";

const chatRoom = new ChatRoom();

chatRoom.on("joined", ({ user }) => {
  console.log(`${user} has joined the chat`);
});

chatRoom.on("leave", ({ user }) => {
  console.log(`${user} has left the chat`);
});

chatRoom.on("send-message", ({ user, message }) => {
  console.log(`${user}: ${message}`);
});

// Simulating the chatroom
chatRoom.join("Shiva");
chatRoom.join("Akash");

chatRoom.sendMessage("Shiva", "Hi Akash, hello to everyone");
chatRoom.sendMessage("Akash", "Hi Shiva, hello to everyone");
chatRoom.sendMessage("kannu", "hello to everyone");

chatRoom.leave("Shiva");
chatRoom.sendMessage("Shiva", "Hi Akash, hello to everyone");

chatRoom.leave("Akash");
chatRoom.leave("Kannu");
chatRoom.leave("kannu");
