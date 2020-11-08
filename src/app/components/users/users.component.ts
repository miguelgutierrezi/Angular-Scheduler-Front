import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {CypherService} from '../../services/cypher.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  public isRegisterMode = false;
  public onLoginForm: FormGroup;
  public onRegistrationForm: FormGroup;
  public isLoading = false;

  constructor(
    private authService: UserService,
    private cypherService: CypherService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
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
    this.isLoading = true;
    if (!this.isRegisterMode) {
      if (this.onLoginForm.invalid) {
        this.isLoading = false;
        return;
      }
      const encryptedPassword = this.cypherService.encrypt(this.onLoginForm.get('password').value);
      const email = this.onLoginForm.get('email').value;
      this.onLogin(email, encryptedPassword);
    } else {
      if (this.onRegistrationForm.invalid) {
        this.isLoading = false;
        return;
      }
      const user = new User();
      user.password = this.cypherService.encrypt(this.onRegistrationForm.get('password').value);
      user.email = this.onRegistrationForm.get('email').value;
      user.name = this.onRegistrationForm.get('name').value;
      this.authService.createUser(user).subscribe(res => {
        console.log(res);
        this.onLogin(user.email, user.password);
      }, error => {
        this.isLoading = false;
        console.log(error);
      });
    }
  }

  private onLogin(email: string, password: string): void {
    console.log(password);
    this.authService.login(email, password).subscribe(res => {
      this.isLoading = false;
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('date', res.date);
      this.router.navigate(['/home']);
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }
}
