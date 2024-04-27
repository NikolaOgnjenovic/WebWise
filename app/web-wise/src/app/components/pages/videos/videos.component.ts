import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NgForOf, NgStyle} from "@angular/common";
import {Video} from "../../../models/video.model";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {VideoListComponent} from "../../shared/video-list/video-list.component";
import {VideoService} from "../../../services/old/video.service";


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NavbarComponent,
    NgStyle,
    VideoListComponent
  ],
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
  videos: Video[] = [];
  filteredVideos: Video[] = [];

  constructor(private videoService: VideoService) {
    this.videos = this.videoService.getAll();
    this.filteredVideos = this.videos;
  }

  search(event: any): void {
    const query = event.target.value;
    this.filteredVideos = this.videos.filter(video =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}
