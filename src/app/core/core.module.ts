import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
@NgModule({
    imports: [ CommonModule, HttpClientModule ]
})

@NgModule({
    imports: [CommonModule,
              RouterModule,
              HttpClientModule],
    declarations: [NavigationComponent],
    exports: [NavigationComponent],
    providers: []
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule

    // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}
