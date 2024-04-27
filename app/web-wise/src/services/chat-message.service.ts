import { Injectable } from '@angular/core';
import {ChatMessage} from "../models/chat-message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  constructor() { }

  createChatMessage(content: string, senderId: string): ChatMessage {
    return {
      id: this.generateUniqueId(),
      dateTimeSent: new Date().toISOString(),
      senderId,
      content
    };
  }

  private generateUniqueId(): string {
    return 'uniqueId';
  }
}
