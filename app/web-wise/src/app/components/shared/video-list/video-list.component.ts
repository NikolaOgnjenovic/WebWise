import {Component, Input} from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {Video} from "../../../models/video.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [
    NgStyle,
    NgForOf
  ],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent {
  @Input() videos: Video[] = [];

  constructor(private router: Router) {}

  navigateToVideoSession(video: Video): void {
    this.router.navigate(['/video-session', video.id]);
  }
}
