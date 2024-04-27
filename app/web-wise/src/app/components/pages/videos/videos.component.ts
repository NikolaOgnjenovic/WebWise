import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {Video} from "../../../models/video.model";
import {VideoService} from "../../../services/video.service";
import {NavbarComponent} from "../../shared/navbar/navbar.component";


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NavbarComponent
  ],
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
  videos: Video[] = [];
  filteredVideos: Video[] = [];

  constructor(private router: Router, private videoService: VideoService) {
    this.videos = this.videoService.getVideos();
    this.filteredVideos = this.videos;
  }

  search(event: any): void {
    const query = event.target.value;
    this.filteredVideos = this.videos.filter(video =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  navigateToVideoSession(video: Video): void {
    this.router.navigate(['/video-session', video.id]);
  }
}
