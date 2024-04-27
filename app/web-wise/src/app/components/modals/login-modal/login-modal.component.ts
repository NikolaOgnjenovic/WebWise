import {Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../../services/auth.service";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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

    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);
    if (!success) {
      this.toastr.error('Invalid credentials. Try again!', 'Error', { positionClass: 'toast-bottom-right' });
    } else {
      this.activeModal.close();
    }
  }
}
