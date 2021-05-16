import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SignInRequest } from '../../models/sign-in-request.model';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  formSubmitted: boolean;
  get f() { return this.signInForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router) {
    this.signInForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formSubmitted = true;
    this.messageService.clear();

    if (this.signInForm.valid) {
      const signInRequest = new SignInRequest(this.signInForm.value);
      this.usersService.authenticateUser(signInRequest)
        .subscribe((user: User) => {
          this.usersService.setLoggedInUser(user);
          this.router.navigate(['/']);
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.message });
        });
    }
  }

}
