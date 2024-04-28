import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../../../services/old/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register-modal',
  standalone: true,
  templateUrl: './register-modal.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, username, password } = this.registerForm.value;
    this.authService.register(username, email, password).subscribe(
      _ => {
        this.toastr.success('Registration successful!', 'Success');
        this.activeModal.close();
      },
      error => {
        if (error.error && error.error.username) {
          this.toastr.error(error.error.username[0], 'Error');
        } else if (error.error && error.error.email) {
          this.toastr.error(error.error.email[0], 'Error');
        } else {
          this.toastr.error('Registration failed', 'Error');
        }
      }
    );
  }
}
