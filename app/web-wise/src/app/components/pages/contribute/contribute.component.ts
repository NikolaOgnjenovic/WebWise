import {ChangeDetectorRef, Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UploadVideoModalComponent} from "../../modals/upload-video-modal/upload-video-modal.component";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {VideoListComponent} from "../../shared/video-list/video-list.component";
import {Video} from "../../../models/video.model";
import {VideoService} from "../../../services/video.service";
import {ToastrService} from "ngx-toastr";

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
  authUserId: string = 'user2'; // TODO: auth user id

  constructor(private modalService: NgbModal, private videoService: VideoService, private toastr: ToastrService) {
    this.videos = this.videoService.getVideosByUploaderId(this.authUserId);
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
    this.toastr.success('Video created successfully', 'Success');
    this.videos = this.videoService.getVideosByUploaderId(this.authUserId);
    this.filteredVideos = this.videos;
  }
}
