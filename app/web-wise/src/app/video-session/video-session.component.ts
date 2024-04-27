import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import { Video } from "../../models/video.model";
import { VideoService } from "../../services/video.service";
import {NavbarComponent} from "../navbar/navbar.component";
import {ChatComponent} from "../chat/chat.component";
import {NgIf} from "@angular/common";
import {VideoSession} from "../../models/video-session.model";
import {VideoSessionService} from "../../services/video-session.service";

@Component({
  selector: 'app-video-session',
  templateUrl: './video-session.component.html',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    ChatComponent,
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
      this.video = this.videoService.getVideoById(videoId);
      if (this.video) {
        this.videoSession = this.videoSessionService.createVideoSession(videoId);
      }
    });
  }
}
