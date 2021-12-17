import { IsloggedService } from './../../../services/islogged.service';
import { Router } from '@angular/router';
import { RequestService } from './../../../services/request.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = { email: '', password: '' }
  public hide = true;

  constructor(private auth: RequestService, private router: Router, private loggedService: IsloggedService) { }

  async login() {
    try {
      const { token, userData } = await this.auth.login(this.user)
      localStorage.setItem('token', token)
      Object.keys(userData).forEach(key => {
        localStorage.setItem(key, userData[key])
      })
      this.loggedService.updateUserData(userData)
      this.router.navigateByUrl("/Shop")
    }
    catch{
      alert("Invalid email or password")
    }
  }



  ngOnInit(): void {
  }

}
