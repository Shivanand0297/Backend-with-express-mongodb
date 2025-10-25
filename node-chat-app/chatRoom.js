import { EventEmitter } from "node:events";

export class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.users = new Set();
  }

  join(user) {
    this.users.add(user);
    this.emit("joined", { user });
  }

  leave(user) {
    if (this.users.has(user)) {
      this.users.delete(user);
      this.emit("leave", { user });
    } else {
      console.log(`${user} is not in the chat room !`);
    }
  }

  sendMessage(user, message) {
    if (this.users.has(user)) {
      this.emit("send-message", { user, message });
    } else {
      console.log(`${user} is not in the chat room !`);
    }
  }
}
