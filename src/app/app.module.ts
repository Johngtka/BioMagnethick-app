import { APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { RouterModule } from '@angular/router';
import { NgModule, isDevMode } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AgePipe } from './pipes/age.pipe';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PatientService } from './services/patient-service';
import { StoreService } from './services/store.service';
import { VisitComponent } from './visit/visit.component';
import { AppRoutingModule } from './app-routing.module';
import { HistoryComponent } from './history/history.component';
import { EmptyStateComponent } from './empty.state/empty.state.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { UserInputDialogComponent } from './user-input-dialog/user-input-dial.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AppointmentsCalendarComponent } from './appointments-calendar/appointments-calendar.component';
import { PointNamesPipe } from './pipes/point-names.pipe';
import { PointImagePipe } from './pipes/point-image.pipe';

import localeEs from '@angular/common/locales/es';
import localePl from '@angular/common/locales/pl';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localeEs);
registerLocaleData(localePl);

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/');
}
export function storeCollection(storeService: StoreService) {
    return () => storeService.fetchStore(); // Dodajemy funkcję zwracającą Promise lub void
}
const navigatorLang = navigator.language.split('-')[0];
const supportedLang = ['pl', 'es', 'en'];
const lang = supportedLang.includes(navigatorLang) ? navigatorLang : 'en';

const materialModules = [
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
];

@NgModule({
    declarations: [
        AppComponent,
        PatientSearchComponent,
        HomeComponent,
        AboutComponent,
        AgePipe,
        UserInputDialogComponent,
        VisitComponent,
        ConfirmationDialogComponent,
        HistoryComponent,
        EmptyStateComponent,
        PatientDetailsComponent,
        PointNamesPipe,
        PointImagePipe,
        AppointmentsCalendarComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        BrowserAnimationsModule,
        LayoutModule,
        TranslateModule.forRoot({
            defaultLanguage: lang,
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ...materialModules,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
    providers: [
        CdkTextareaAutosize,
        PatientService,
        DatePipe,
        StoreService,
        {
            provide: APP_INITIALIZER,
            useFactory: storeCollection,
            deps: [StoreService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
