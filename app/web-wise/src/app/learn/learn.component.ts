import { Component } from '@angular/core';
import {Video} from "../../models/video.model";
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    NgForOf
  ],
  styleUrls: ['./learn.component.css']
})
export class LearnComponent {
  videos: Video[] = [
    new Video('Video 1', 'thumbnail1.jpg', 'video1.mp4'),
    new Video('Video 2', 'thumbnail2.jpg', 'video2.mp4'),
  ];

  filteredVideos: Video[] = [];

  constructor() {
    this.filteredVideos = this.videos;
    for (int i = 0; i < )
  }

  search(query: string): void {
    this.filteredVideos = this.videos.filter(video =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}
