import {Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    if (this.authService.login(username, password)) {
      this.activeModal.close();
    } else {
      this.toastr.error('Invalid credentials. Try again!', 'Error', { positionClass: 'toast-bottom-right' });
    }
    // this.authService.login(username, password).subscribe(
    //   success => {
    //     if (!success) {
    //       this.toastr.error('Invalid credentials. Try again!', 'Error', { positionClass: 'toast-bottom-right' });
    //     } else {
    //       this.activeModal.close();
    //     }
    //   },
    //   error => {
    //     console.error('Login failed:', error);
    //     this.toastr.error('An error occurred during login. Please try again later.', 'Error', { positionClass: 'toast-bottom-right' });
    //   }
    // );
  }
}
