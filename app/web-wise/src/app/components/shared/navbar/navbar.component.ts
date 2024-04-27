import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {NgIf} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginModalComponent} from "../../modals/login-modal/login-modal.component";
import {RegisterModalComponent} from "../../modals/register-modal/register-modal.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private modalService: NgbModal) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUsername(): string {
    return this.authService.getCurrentUser()?.username ?? "";
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
