import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './guard/auth.guard';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import 'hammerjs';

import { AuthService } from './service/auth.service';
import { ContentService } from './service/content.service';
import { UploadService } from './service/upload.service';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { MapComponent } from './map/map.component';
import { PageComponent } from './page/page.component';

import { MatFileUploadModule } from 'angular-material-fileupload';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'map', component: MapComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'page/:id', component: PageComponent, canActivate: [AuthGuard]},
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MapComponent,
    AdminComponent,
    MainMenuComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatFileUploadModule,
    RouterModule.forRoot(
      appRoutes,
      {useHash: true}
    ),
    LeafletModule.forRoot()
  ],
  providers: [AuthGuard, AuthService, ContentService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
