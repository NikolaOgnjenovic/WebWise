import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {VideoSession} from "../../../models/video-session.model";
import {VideoSessionService} from "../../../services/video-session.service";
import {ChatMessageService} from "../../../services/chat-message.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() videoSession: VideoSession | null;

  constructor(
    private chatMessageService: ChatMessageService,
    private videoSessionService: VideoSessionService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.videoSession = null;
  }

  async getUserNameByUserId(userId: string): Promise<string> {
    console.log("getting");
    try {
      return await this.authService.getUserNameByUserId(userId).toPromise() ?? "User";
    } catch (error) {
      console.error('Error getting username:', error);
      return '';
    }
  }

  sendMessage(inputMessage: HTMLInputElement): void {
    const message = inputMessage.value.trim();
    if (message === '') {
      return;
    }

    if (this.videoSession) {
      // TODO: Sender id
      const chatMessage = this.chatMessageService.createChatMessage(message, this.authService.getCurrentUser()!.id, this.authService.getCurrentUser()!.username);
      this.videoSessionService.addChatMessage(this.videoSession.id, chatMessage);
      this.cdr.detectChanges();
    }

    inputMessage.value = '';
  }
}
