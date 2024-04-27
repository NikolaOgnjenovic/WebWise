import { Component } from '@angular/core';
import { Video } from "../../models/video.model";
import {Router, RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {VideoService} from "../../services/video.service";

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NavbarComponent
  ],
  styleUrls: ['./learn.component.css']
})
export class LearnComponent {
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
