import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {VideoSession} from "../../../models/video-session.model";
import {VideoSessionService} from "../../../services/video-session.service";
import {ChatMessageService} from "../../../services/chat-message.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() videoSession: VideoSession | null;

  constructor(
    private chatMessageService: ChatMessageService,
    private videoSessionService: VideoSessionService,
    private cdr: ChangeDetectorRef
  ) {
    this.videoSession = null;
  }

  sendMessage(inputMessage: HTMLInputElement): void {
    const message = inputMessage.value.trim();
    if (message === '') {
      return;
    }

    if (this.videoSession) {
      // TODO: Sender id
      const chatMessage = this.chatMessageService.createChatMessage(message, 'userSenderId');
      this.videoSessionService.addChatMessage(this.videoSession.id, chatMessage);
      this.cdr.detectChanges();
    }

    inputMessage.value = '';
  }
}
