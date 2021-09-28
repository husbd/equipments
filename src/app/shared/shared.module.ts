import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFormComponent } from './forms/equipment-form/equipment-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EquipmentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    EquipmentFormComponent
  ]
})
export class SharedModule { }
