import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {ChatComponent} from "../../shared/chat/chat.component";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {NgClass, NgIf} from "@angular/common";
import {Video} from "../../../models/video.model";
import {VideoSession} from "../../../models/video-session.model";
import {VideoSessionService} from "../../../services/video-session.service";
import { ToastrService } from 'ngx-toastr';
import {VideoService} from "../../../services/video.service";

@Component({
  selector: 'app-video-session',
  templateUrl: './video-session.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    ChatComponent,
    NavbarComponent,
    NgIf,
    NgClass
  ],
  styleUrls: ['./video-session.component.css']
})
export class VideoSessionComponent implements OnInit {
  video: Video | null = null;
  videoSession: VideoSession | null;
  videoIsPlaying: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private videoSessionService: VideoSessionService,
    private toastr: ToastrService
  ) {
    this.videoSession = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const videoId = params['id'];
      const sessionId = params['sessionId'];
      this.video = this.videoService.getVideoById(videoId);
      if (!this.video) {
        this.toastr.error('Video cannot be played', 'Error', { positionClass: 'toast-bottom-right' });
        return;
      }

      if (this.video) {
        if (sessionId) {
          this.videoSession = this.videoSessionService.getVideoSessionById(sessionId);
        } else {
          this.videoSession = this.videoSessionService.createVideoSession(videoId);
        }
      }
    });
  }

  togglePlayPause(videoPlayer: HTMLVideoElement): void {
    if (this.videoIsPlaying) {
      videoPlayer.pause();
    } else {
      videoPlayer.play();
    }
    this.videoIsPlaying = !this.videoIsPlaying;
  }

  skipBackward(videoPlayer: HTMLVideoElement): void {
    videoPlayer.currentTime -= 10;
  }

  skipForward(videoPlayer: HTMLVideoElement): void {
    videoPlayer.currentTime += 10;
  }

  onVideoLoad(videoPlayer: HTMLVideoElement): void {
    if (videoPlayer.readyState === 4 && videoPlayer.networkState === 3) {
      this.toastr.error('Failed to load the video', 'Error', { positionClass: 'toast-bottom-right' });
    } else {
      videoPlayer.pause();
      this.videoIsPlaying = false;
    }
  }
}
