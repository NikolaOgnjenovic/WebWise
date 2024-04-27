import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UploadVideoModalComponent} from "../../modals/upload-video-modal/upload-video-modal.component";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent {

  constructor(private modalService: NgbModal) {}

  openModal(): void {
    this.modalService.open(UploadVideoModalComponent, { centered: true });
  }
}
