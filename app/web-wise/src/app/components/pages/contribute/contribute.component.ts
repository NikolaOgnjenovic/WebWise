import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CreateVideoModalComponent} from "../../modals/create-video-modal/create-video-modal.component";
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
    this.modalService.open(CreateVideoModalComponent, { centered: true });
  }
}
