import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../../services/old/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginModalComponent} from "../../modals/login-modal/login-modal.component";
import {RegisterModalComponent} from "../../modals/register-modal/register-modal.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
    imports: [
        NgIf,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private authService: AuthService, private modalService: NgbModal) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  openLoginModal(): void {
    this.modalService.open(LoginModalComponent, { centered: true });
  }

  openRegisterModal(): void {
    this.modalService.open(RegisterModalComponent, { centered: true });
  }
}
