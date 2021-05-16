import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SignUpRequest } from '../../models/sign-up-request.model';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { MustMatch } from '../../validators/must-match-validator';
import { UserIdAvailableAsyncValidator } from '../../validators/user-id-available-async-validator';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  formSubmitted: boolean;
  get f() { return this.signUpForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router) {
    this.signUpForm = this.formBuilder.group({
      userId: ['', [Validators.required], [UserIdAvailableAsyncValidator.createValidator(usersService)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.signUpForm.valid) {
      const signUpRequest = new SignUpRequest(this.signUpForm.value);
      this.usersService.registerUser(signUpRequest)
        .subscribe((user: User) => {
          this.usersService.setLoggedInUser(user);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have been registered successfully.' });
          this.router.navigate(['/']);
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.message });
        });
    }
  }

  onReset() {
    this.signUpForm.reset();
    this.formSubmitted = false;
  }

}
