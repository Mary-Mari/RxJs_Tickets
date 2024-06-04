import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth/auth.service";
import { MessageService } from "primeng/api";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  repeatPassword: string;
  oldPassword: string ;
  newPassword: string ;
  
  

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPasswordRepeat: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onChange() {
    if (this.passwordForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Form validation error', detail: 'Please check the form fields' });
      return;
    }

    const oldPassword = this.passwordForm.get('currentPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const repeatPassword = this.passwordForm.get('newPasswordRepeat')?.value;

    if (oldPassword !== this.authService.user?.psw) {
      this.messageService.add({ severity: 'error', summary: 'Old password is wrong' });
      return;
    }
    if (newPassword !== repeatPassword) {
      this.messageService.add({ severity: 'error', summary: 'New passwords are not the same' });
      return;
    }
    
    this.authService.changePassword(newPassword)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Failed to change password', detail: error.message });
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.messageService.add({ severity: 'success', summary: 'Password changed!' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Failed to change password', detail: 'Unexpected error occurred' });
        }
      });
  }
}
