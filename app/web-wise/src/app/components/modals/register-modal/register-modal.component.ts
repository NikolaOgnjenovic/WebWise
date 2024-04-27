import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "../../../services/auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register-modal.component.html'
})
export class RegisterModalComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService,
              private formBuilder: FormBuilder) {}

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
    this.authService.register(username, email, password);
    this.activeModal.close();
  }
}
