import { Component } from '@angular/core';
import { IsloggedService } from './../../../services/islogged.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public userRole: String
  private userName: String
  status = false
  constructor(public loginService: IsloggedService) {
    loginService.user.subscribe(user => {
      this.userName = user["name"]
      if (this.userName && this.userName.length > 1) {
        this.status = true
      }
    })
    loginService.userRole.subscribe(user => {
      this.userRole = user["role"]
      console.log(this.userRole)
    })
  }

  logout() {
    this.status = false
    localStorage.clear()
    this.loginService.updateStatus(false, '')
    this.loginService.updateUserData({})
  }
}
