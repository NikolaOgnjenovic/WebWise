import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UploadVideoModalComponent} from "../../modals/upload-video-modal/upload-video-modal.component";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {VideoListComponent} from "../../shared/video-list/video-list.component";
import {Video} from "../../../models/video.model";
import {VideoService} from "../../../services/video.service";

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    VideoListComponent
  ],
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent {
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  constructor(private modalService: NgbModal, private videoService: VideoService) {
    // TODO: auth user id
    this.videos = this.videoService.getVideosByUploaderId('user2');
    this.filteredVideos = this.videos;
  }

  openModal(): void {
    this.modalService.open(UploadVideoModalComponent, { centered: true });
  }

  search(event: any): void {
    const query = event.target.value;
    this.filteredVideos = this.videos.filter(video =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}
