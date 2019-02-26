import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { FlowService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    datas: any = {};

    constructor(
        private authenticationService: AuthenticationService,
        private flowService: FlowService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadData();
    }

    ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }

    private loadData() {
        let token = this.currentUser.token;
        let filter = {
          project: 'Test',
          flow: 'basic',
          start: 0,
          length: 3
        };
        this.flowService.getAll(token, filter).pipe(first()).subscribe(response => {
            this.datas = response;
        });
    }
}
