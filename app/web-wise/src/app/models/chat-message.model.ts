export class ChatMessage {
  id: string;
  sentDateTime: string;
  senderId: string;
  username: string;
  content: string;

  constructor(id: string, dateTimeSent: string, senderId: string, senderUsername: string, content: string) {
    this.id = id;
    this.sentDateTime = dateTimeSent;
    this.senderId = senderId;
    this.username = senderUsername;
    this.content = content;
  }
}
