import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {Video} from "../../../models/video.model";
import {VideoSessionService} from "../../../services/video-session.service";
import {VideoSession} from "../../../models/video-session.model";
import {SidebarComponent} from "../../shared/sidebar/sidebar.component";
import {VideoService} from "../../../services/video.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgIf,
    SidebarComponent,
    NgStyle
  ],
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  videoSessions: VideoSession[] = [];
  videos: { [key: string]: Video } = {};

  constructor(
    private videoSessionService: VideoSessionService,
    private videoService: VideoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.videoSessions = this.videoSessionService.getAll();
    this.fetchVideoDetails();
  }

  fetchVideoDetails(): void {
    this.videoSessions.forEach(session => {
      const video = this.videoService.getVideoById(session.videoId);
      if (video) {
        this.videos[session.id] = video;
      }
    });
  }

  navigateToVideoSession(videoSession: VideoSession): void {
    const video = this.videos[videoSession.id];
    if (video) {
      this.router.navigate(['/video-session', video.id, videoSession.id]);
    } else {
      console.error(`Video with ID ${videoSession.id} not found.`);
    }
  }
}
