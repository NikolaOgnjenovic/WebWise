import {ChatMessage} from "./chat-message.model";

export class VideoSession {
  id: string;
  videoId: string;
  chatMessages: ChatMessage[];
  lastModifiedDateTime: string;

  constructor(id: string, videoId: string, chatMessages: ChatMessage[], dateTimeLastUsed: string) {
    this.id = id;
    this.videoId = videoId;
    this.chatMessages = chatMessages;
    this.lastModifiedDateTime = dateTimeLastUsed;
  }
}
