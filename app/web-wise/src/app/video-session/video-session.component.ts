import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import { Video } from "../../models/video.model";
import { VideoService } from "../../services/video.service";
import { VideoSession } from "../../models/video-session.model";
import { VideoSessionService } from "../../services/video-session.service";
import {ChatComponent} from "../chat/chat.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgIf} from "@angular/common";

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
          console.log("SESSIONID: " + sessionId);
          this.videoSession = this.videoSessionService.getVideoSessionById(sessionId);
          console.table(this.videoSession);
        } else {
          console.log("Empty session id");
          this.videoSession = this.videoSessionService.createVideoSession(videoId);
          console.table(this.videoSession);
        }
      }
    });
  }
}
