import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LMarkdownEditorModule } from 'ngx-markdown-editor/dist';
import { UtilModule } from './util/util.module';
import { MockService } from './util/mock.service';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        FormsModule, // make sure FormsModule is imported to make ngModel work
        LMarkdownEditorModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot({
            name: btoa((document.getElementsByTagName('base')[0] || {}).href)
        }),
        AppRoutingModule,
        UtilModule
        // ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: Window, useValue: window},
        MockService,
        {
            provide: APP_INITIALIZER,
            useFactory: configFactory,
            deps: [MockService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function configFactory(mockService: MockService) {
    return  () => mockService.init();
}
