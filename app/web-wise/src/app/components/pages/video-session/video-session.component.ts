import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {ChatComponent} from "../../shared/chat/chat.component";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {NgIf} from "@angular/common";
import {Video} from "../../../models/video.model";
import {VideoSession} from "../../../models/video-session.model";
import {VideoSessionService} from "../../../services/video-session.service";
import {VideoService} from "../../../services/video.service";

@Component({
  selector: 'app-video-session',
  templateUrl: './video-session.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    ChatComponent,
    NavbarComponent,
    NgIf
  ],
  styleUrls: ['./video-session.component.css']
})
export class VideoSessionComponent implements OnInit {
  video: Video | null = null;
  videoSession: VideoSession | null;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private videoSessionService: VideoSessionService
  ) {
    this.videoSession = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const videoId = params['id'];
      const sessionId = params['sessionId'];
      this.video = this.videoService.getVideoById(videoId);
      if (this.video) {
        if (sessionId) {
          this.videoSession = this.videoSessionService.getVideoSessionById(sessionId);
        } else {
          this.videoSession = this.videoSessionService.createVideoSession(videoId);
        }
      }
    });
  }
}
