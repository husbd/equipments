import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DetailRoutingModule
  ]
})
export class DetailModule { }
