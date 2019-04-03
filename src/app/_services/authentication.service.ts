import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    baseUrl = environment.baseUrl;
    corsUrl = environment.corsUrl;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }



    login(username: string, password: string) {
      const data = new HttpParams()
        .set('username', username)
        .set('password', password);

        return this.http.post<any>(`${this.corsUrl}${this.baseUrl}?action=login&`, data, {headers: new HttpHeaders()
           .set('Content-Type', 'application/x-www-form-urlencoded')
         })
            .pipe(map(response => {
                console.log('response', response);
                if (response.status === 'success') {
                    let responseData = {
                      id: 1,
                      username: username,
                      firstName: username,
                      lastName: username,
                      token: response['session.id']
                    }
                    localStorage.setItem('currentUser', JSON.stringify(responseData));
                    this.currentUserSubject.next(responseData);
                }

                return response;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
