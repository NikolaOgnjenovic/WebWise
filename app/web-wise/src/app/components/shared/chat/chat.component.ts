import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {VideoSession} from "../../../models/video-session.model";
import {VideoSessionService} from "../../../services/video-session.service";
import {DateFormatPipe} from "../../../pipes/date-format.pipe";
import {AuthService} from "../../../services/auth.service";
import {ChatMessageService} from "../../../services/old/chat-message.service";
import { HttpClient } from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    DateFormatPipe
  ],
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() videoSession: VideoSession | null;

  constructor(
    private chatMessageService: ChatMessageService,
    private videoSessionService: VideoSessionService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private http: HttpClient
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
      console.log("ADDED");
      const chatMessage = this.chatMessageService.createChatMessage(message, this.authService.getCurrentUser()!.id, this.authService.getCurrentUser()!.username);
      this.videoSessionService.addChatMessage(this.videoSession.id, chatMessage);
      this.cdr.detectChanges();

        const history: {'role': string, 'content': string}[] = [];
        this.videoSession.chatMessages.forEach((message) => {
            const role = message.senderId==='-1' ? 'ai' : 'user';
            history.push(
                {
                    role,
                    'content': message.content
                }
            );
        });
      var observable = this.http.post<any>('http://localhost:8002/api/v1/videos/', {
        'history': history
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
    }

    inputMessage.value = '';
  }
}
