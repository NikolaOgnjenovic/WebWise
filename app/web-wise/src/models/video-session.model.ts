import {ChatMessage} from "./chat-message.model";

export class VideoSession {
  id: string;
  videoId: string;
  chatMessages: ChatMessage[];

  constructor(id: string, videoId: string, chatMessages: ChatMessage[]) {
    this.id = id;
    this.videoId = videoId;
    this.chatMessages = chatMessages;
  }
}
