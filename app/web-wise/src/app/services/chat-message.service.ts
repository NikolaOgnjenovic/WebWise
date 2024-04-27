import { Injectable } from '@angular/core';
import {ChatMessage} from "../models/chat-message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  constructor() { }

  createChatMessage(content: string, senderId: string, senderUsername: string): ChatMessage {
    return {
      id: this.generateUniqueId(),
      sentDateTime: new Date().toISOString(),
      senderId,
      content,
      senderUsername
    };
  }

  private generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
