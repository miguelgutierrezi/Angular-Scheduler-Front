import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {CypherService} from '../../services/cypher.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  isRegisterMode = false;
  public onLoginForm: FormGroup;
  public onRegistrationForm: FormGroup;

  constructor(
    private authService: UserService,
    private cypherService: CypherService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.onLoginForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])]
    });

    this.onRegistrationForm = this.formBuilder.group({
      name: [null, Validators.compose([
        Validators.required
      ])],
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  public onChangeMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
  }

  public onSubmit(): void {
    if (this.onLoginForm.invalid) {
      return;
    }

    const encryptedPassword = this.cypherService.encrypt(this.onLoginForm.get('password').value);
    const email = this.onLoginForm.get('email').value;
    this.authService.login(email, encryptedPassword).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}
