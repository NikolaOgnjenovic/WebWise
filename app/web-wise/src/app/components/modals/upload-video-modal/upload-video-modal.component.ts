import {Component, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {VideoService} from "../../../services/old/video.service";
import {AuthService} from "../../../services/old/auth.service";

@Component({
  selector: 'app-upload-video-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: 'upload-video-modal-component.html',
  styleUrls: ['./upload-video-modal.component.css']
})
export class UploadVideoModalComponent {
  @Input() onVideoCreated: (() => void) | undefined;
  newVideoForm: FormGroup;

  constructor(protected modalService: NgbModal, private videoService: VideoService, private authService: AuthService) {
    this.newVideoForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      thumbnailUrl: new FormControl('', [Validators.required, this.urlValidator]),
      videoUrl: new FormControl('', [Validators.required, this.urlValidator])
    });
  }

  createVideo(): void {
    if (!this.newVideoForm.valid) {
      console.error('Invalid video details');
      return;
    }

    const { title, thumbnailUrl, videoUrl } = this.newVideoForm.value;
    this.videoService.addVideo(title, thumbnailUrl, videoUrl, this.authService.getCurrentUser()!.id);
    this.modalService.dismissAll();
    this.newVideoForm.reset();
    if (this.onVideoCreated != undefined) {
      this.onVideoCreated();
    }
    // this.videoService.createVideo(title, thumbnailUrl, videoUrl, this.authService.getCurrentUser()!.id)
    //   .subscribe(
    //     (response) => {
    //       console.log('Video created successfully: ', response);
    //       if (this.onVideoCreated != undefined) {
    //         this.onVideoCreated();
    //       }
    //       this.modalService.dismissAll();
    //       this.newVideoForm.reset();
    //     },
    //     (error) => {
    //       console.error('Error creating video:', error);
    //     }
    //   );
  }

  urlValidator(control: FormControl): { [key: string]: boolean } | null {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (control.value && !urlRegex.test(control.value)) {
      return { 'invalidUrl': true };
    }
    return null;
  }
}
