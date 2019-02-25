import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }



    login(username: string, password: string) {
      const data = {
        username: username,
        password: password
      };

      const user = {username: username};
      const pwd = {password: password};
        console.log('data is', data);
        let user = {
          id: 1,
          username: username,
          password: password,
          firstName: username,
          lastName: username,
          token: "afaf4c34-7bc8-48a4-ac6b-8636092c3fc0",
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return this.http.post<any>(`${this.baseUrl}?action=login&`, {user, pwd})
            .pipe(map(user => {
                console.log('response is', user);
                // login successful if there's a jwt token in the response
                if (user && user.id) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
