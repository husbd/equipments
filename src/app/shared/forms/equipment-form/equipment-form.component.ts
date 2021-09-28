import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Equipment } from 'src/app/models/equipment.model';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.scss']
})
export class EquipmentFormComponent implements OnInit, OnChanges {

  @Input() equipment: Equipment | undefined;
  equipmentForm = this.fb.group({
    id: new FormControl({value: '', disabled: true}, Validators.required),
    model: new FormControl('', Validators.required),
    brand: new FormControl(''),
    weight: new FormControl(''),
    manufactureDate: new FormControl(''),
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  /**
   * @description populate forms on input change
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.equipment !== null && this.equipment !== undefined) {
      this.populateForm(this.equipment);
    }
  }

  /**
   * @description populate form with input equipment obj
   * @param equipment 
   */
   private populateForm(equipment: Equipment) {
    this.equipmentForm.get('id')?.setValue(equipment.id);
    this.equipmentForm.get('model')?.setValue(equipment.model);
    this.equipmentForm.get('brand')?.setValue(equipment.brand);
    this.equipmentForm.get('weight')?.setValue(equipment.weight);
    this.equipmentForm.get('manufactureDate')?.setValue(equipment.manufactureDate);
  }

  /**
   * @description getter for current form state
   * @returns 
   */
  public getCurrentEquipment(): Equipment {
    return this.equipmentForm.getRawValue();
  }

  /**
   * @description check is id emtpy
   * @returns 
   */
  public hasId(): boolean {
    const _id = this.equipmentForm.get('id')?.value;
    return _id !== null && _id !== undefined && _id !== '';
  }

  /**
   * @description check is form valid
   * @returns 
   */
  public isFormInvalid(): boolean {
    return this.equipmentForm.invalid;
  }

}
