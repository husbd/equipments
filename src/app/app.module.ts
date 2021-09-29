import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateModule } from './modules/create/create.module';
import { DetailModule } from './modules/detail/detail.module';
import { ListModule } from './modules/list/list.module';
import { ModalComponent } from './shared/modal/modal.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    ListModule,
    DetailModule,
    CreateModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
