
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloggedService {
  public userRole = new BehaviorSubject<Object>({ role: localStorage.getItem("role") });
  public user = new BehaviorSubject<Object>({ name: localStorage.getItem("name") });
  public isLogged = new BehaviorSubject<Boolean>(false);
  constructor() { }

  updateStatus(status, role) {
    this.isLogged.next(status)
  }

  updateUserData(user: any) {
    this.user.next(user)
    this.userRole.next(user.role)
  }

}
