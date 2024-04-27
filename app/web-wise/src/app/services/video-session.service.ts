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
      chatMessages: [],
      lastModifiedDateTime: new Date().toISOString()
    };
    this.videoSessions.push(videoSession);
    return videoSession;
  }

  getAll(): VideoSession[] {
    return this.videoSessions;
  }

  getVideoSessionById(id: string): VideoSession | null {
    return this.videoSessions.find(session => session.id === id) ?? null;
  }

  addChatMessage(videoSessionId: string, chatMessage: ChatMessage): void {
    const videoSession = this.videoSessions.find(session => session.id === videoSessionId);
    if (videoSession) {
      videoSession.chatMessages.push(chatMessage);
    }
  }

  private generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
