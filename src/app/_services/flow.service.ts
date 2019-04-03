import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class FlowService {
    corsUrl = environment.corsUrl;
    baseUrl = environment.baseUrl + 'manager?';
    public params: string;
    constructor(private http: HttpClient) { }

    getAll(token: string, filter: any){
      this.params = `project=${filter.project}&flow=${filter.flow}&start=${filter.start}&length=${filter.length}&ajax=fetchFlowExecutions&session.id=${token}`;
      return this.http.get(`${this.corsUrl}${this.baseUrl}${this.params}`);
    }

}
