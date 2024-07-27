import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationError } from './application-error';

@Injectable()
export class ApplicationErrorsHandler implements ErrorHandler {
    constructor(
        private injector: Injector,
        private zone: NgZone
    ) { }

    handleError(error: Error | HttpErrorResponse | any) {
        if (error.rejection) {
            error = error.rejection;
        } else if (error instanceof ApplicationError) {
            this.showMessage(error.message);
        } else {
            console.error('Error: ', error);
        }
    }

    private offlineError(error: Error | HttpErrorResponse) {
        console.error('Http Offline: ', error);
    }

    private showMessage(message: string, params = {}, description?: string) {
        // tslint:disable-next-line: deprecation
        this.zone.run(() => {
            console.log(message);
        });
    }
    private showMessageI18n(i18nkey: string, params = {}, description?: string) {
        // tslint:disable-next-line: deprecation
        this.zone.run(() => {
        });
    }
}
