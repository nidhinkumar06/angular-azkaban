import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    baseUrl = environment.baseUrl;
    params = `manager?project=Test&flow=basic&start=0&length=3&ajax=fetchFlowExecutions&session.id`;

    constructor(private http: HttpClient) { }


    getById(id: string) {
        return this.http.get<User[]>(`${this.baseUrl}/${this.params}=${id}`);
    }

}
