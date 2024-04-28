import { Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UploadVideoModalComponent} from "../../modals/upload-video-modal/upload-video-modal.component";
import {RouterOutlet} from "@angular/router";
import {VideoListComponent} from "../../shared/video-list/video-list.component";
import {Video} from "../../../models/video.model";
import {ToastrService} from "ngx-toastr";
import {VideoService} from "../../../services/old/video.service";
import {AuthService} from "../../../services/old/auth.service";
import {SidebarComponent} from "../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    VideoListComponent,
    SidebarComponent
  ],
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent {
  videos: Video[] = [];
  filteredVideos: Video[] = [];

  constructor(private modalService: NgbModal, private videoService: VideoService, private toastr: ToastrService, private authService: AuthService) {
    this.videos = this.videoService.getVideosByUploaderId(this.authService.getCurrentUser()!.id);
    this.filteredVideos = this.videos;
  }

  openModal(): void {
    const modalRef = this.modalService.open(UploadVideoModalComponent, { centered: true });
    modalRef.componentInstance.onVideoCreated = () => this.onVideoCreated();
  }

  search(event: any): void {
    const query = event.target.value;
    this.filteredVideos = this.videos.filter(video =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  onVideoCreated(): void {
    this.toastr.success('Video created successfully', 'Success', { positionClass: 'toast-bottom-right' });
    this.videos = this.videoService.getVideosByUploaderId(this.authService.getCurrentUser()!.id);
    this.filteredVideos = this.videos;
  }
}
