import { Injectable } from '@angular/core';
import { VideoSession } from '../models/video-session.model';
import {ChatMessage} from "../models/chat-message.model";

@Injectable({
  providedIn: 'root'
})
export class VideoSessionService {
  private videoSessions: VideoSession[] = [];

  constructor() {}

  createVideoSession(videoId: string): VideoSession {
    const videoSession: VideoSession = {
      id: this.generateUniqueId(),
      videoId,
      chatMessages: []
    };
    this.videoSessions.push(videoSession);
    return videoSession;
  }

  private generateUniqueId(): string {
    return 'uniqueId';
  }

  getVideoSessionById(id: string): VideoSession | undefined {
    return this.videoSessions.find(session => session.id === id);
  }

  addChatMessage(videoSessionId: string, chatMessage: ChatMessage): void {
    const videoSession = this.videoSessions.find(session => session.id === videoSessionId);
    if (videoSession) {
      videoSession.chatMessages.push(chatMessage);
    }
  }
}
