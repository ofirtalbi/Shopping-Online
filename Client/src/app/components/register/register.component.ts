import { IsloggedService } from './../../../services/islogged.service';

import { RequestService } from './../../../services/request.service';

import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user = new UserModel();
  public hide = true;
  public hide2 = true;
  public myForm: FormGroup;
  public myForm2: FormGroup;
  public cityList = [
    'Arad',
    'Ashdod',
    'Ashkelon',
    'Bat-Yam',
    'Beer-Sheva',
    'Beit Shean',
    'Dimona',
    'Eilat',
    'Givatayim',
    'Hadera',
    'Haifa',
    'Herzliya',
    'Hod HaSharon',
    'Holon',
    'Jerusalem',
    'Kfar Saba',
    'Kiryat Gat',
    'Kiryat Shmona',
    'Lod',
    'Modiin',
    'Nahariya',
    'Nazerath',
    'Netanya',
    'Netivot',
    'Ofakim',
    'Petah-Tikva',
    'Ramat Gan',
    'Ramla',
    'Rehovot',
    'Rishon LeZion',
    'Sderot',
    'Tel-Aviv',
    'Yavne',
    'Givatayim',
  ];

  constructor(
    private auth: RequestService,
    private fb: FormBuilder,
    private router: Router,
    private loggedService: IsloggedService
  ) {
    this.myForm = this.fb.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
        id: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        Rpassword: new FormControl('', [Validators.required]),
      },
      { validator: this.checkPasswords('password', 'Rpassword') }
    );

    this.myForm2 = this.fb.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
    });
  }

  getEmailError() {
    return this.myForm.get('email').hasError('required')
      ? 'Email is required'
      : this.myForm.get('email').hasError('pattern')
      ? 'Not a valid email'
      : '';
  }

  getIdError() {
    if (this.myForm.get('id').hasError('required')) return 'ID is required';
    if (this.myForm.get('id').hasError('minlength'))
      return '10 Digits are required';
    if (this.myForm.get('id').hasError('pattern'))
      return 'ID Should consist of numbers only';
    return '';
  }
  getPassError() {
    if (this.myForm.get('password').hasError('required'))
      return 'Password is required';
    if (this.myForm.get('password').hasError('minlength'))
      return '8-15 Characters are required';
    return '';
  }

  getConfirmError() {
    if (this.myForm.get('Rpassword').hasError('confirmPassMatch'))
      return 'Password is not matching';
    return '';
  }

  checkPasswords = (pass: string, rPass: string) => {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[pass];
      const matchingControl = formGroup.controls[rPass];

      if (control.value !== matchingControl.value)
        matchingControl.setErrors({ confirmPassMatch: true });
      else matchingControl.setErrors(null);
    };
  };

  async continue() {
    try {
      this.user._id = this.myForm.get('id').value;
      this.user.email = this.myForm.get('email').value;
      this.user.password = this.myForm.get('password').value;

      await this.auth.checkAvailability(this.user).then(
        (res) => {
          this.myForm2.enable();
        },
        (err) => alert('ID or Email already in use')
      );
    } catch (err) {
      alert('ID or Email already in use');
    }
  }
  async submitForm() {
    this.user._id = this.myForm.get('id').value;
    this.user.email = this.myForm.get('email').value;
    this.user.password = this.myForm.get('password').value;
    this.user.name = this.myForm2.get('name').value;
    this.user.lastName = this.myForm2.get('lastName').value;
    this.user.city = this.myForm2.get('city').value;
    this.user.street = this.myForm2.get('street').value;
    try {
      const { token, userData } = await this.auth.register(this.user);
      localStorage.setItem('token', token);
      Object.keys(userData).forEach((key) => {
        localStorage.setItem(key, userData[key]);
      });

      this.loggedService.updateUserData(userData);
      alert('Registration successful!');
      this.router.navigateByUrl('/Shop');
    } catch (err) {
      alert(err.error);
    }
  }

  ngOnInit(): void {
    this.myForm2.disable();
  }
}
