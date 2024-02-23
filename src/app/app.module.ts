import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PessoasService } from './services/pessoas.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { UserQueryDataComponent } from './pages/user-query-data/user-query-data.component';
import { AppRoutingModuleModule } from './app-routing-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './shared/angular-material/ngMaterial.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent, RegisterFormComponent, UserQueryDataComponent],
  imports: [
    BrowserModule,
    AppRoutingModuleModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [PessoasService, provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
