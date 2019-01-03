import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';
import { RouterModule } from '@angular/router';
import { LogResponseInterceptor } from './interceptors/log-response.interceptor';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { AppTitleService } from './services/app-title.service';
@NgModule({
    imports: [ CommonModule, HttpClientModule ]
})

@NgModule({
    imports: [CommonModule,
              RouterModule,
              HttpClientModule],
    declarations: [],
    exports: [ ],
    providers: [
        AppTitleService,
        { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule

    // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}
