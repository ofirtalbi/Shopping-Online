import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  constructor(private _http: Http) {}

  async canActivate(): Promise<boolean> {
    let accessibility = false;
    console.log('Admin Connected!');
    const token = localStorage.getItem('token');
    await this._http
      .post('http://localhost:3000/api/users/admin', { token })
      .toPromise()
      .then(
        (res) => {
          res.status === 201 ? (accessibility = true) : (accessibility = false);
        },
        (err) => {
          console.log(err);
        }
      );
    return accessibility;
  }
}
