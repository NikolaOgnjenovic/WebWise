export class ChatMessage {
  id: string;
  dateTimeSent: string;
  senderId: string;
  content: string;

  constructor(id: string, dateTimeSent: string, senderId: string, content: string) {
    this.id = id;
    this.dateTimeSent = dateTimeSent;
    this.senderId = senderId;
    this.content = content;
  }
}
