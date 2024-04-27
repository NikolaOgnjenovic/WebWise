import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoService } from '../../../services/video.service';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-upload-video-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: 'upload-video-modal-component.html'
})
export class UploadVideoModalComponent {
  newVideoForm: FormGroup;

  constructor(protected modalService: NgbModal, private videoService: VideoService) {
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
    this.videoService.addVideo(title, thumbnailUrl, videoUrl);
    this.modalService.dismissAll();
    this.newVideoForm.reset();
  }

  urlValidator(control: FormControl): { [key: string]: boolean } | null {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (control.value && !urlRegex.test(control.value)) {
      return { 'invalidUrl': true };
    }
    return null;
  }
}
