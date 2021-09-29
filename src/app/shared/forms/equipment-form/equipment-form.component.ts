import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Equipment } from 'src/app/models/equipment.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.scss']
})
export class EquipmentFormComponent implements OnInit, OnDestroy {

  isCreate$?: Observable<boolean | undefined>;

  valueChangesSubscription?: Subscription;
  equipmentSubscription?: Subscription;

  equipmentForm = this.fb.group({
    id: new FormControl({value: '', disabled: true}),
    model: new FormControl('', Validators.required),
    brand: new FormControl(''),
    weight: new FormControl(''),
    manufactureDate: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private cmnServ: CommonService
  ) { }

  ngOnInit(): void {
    this.isCreate$ = this.cmnServ.getIsCreateFromStore();
    this.equipmentSubscription = this.cmnServ.getEquipmentFromStore().subscribe(
      res => {
        this.populateForm(res);
        // push latest value to store on value change
        if (!this.valueChangesSubscription) {
          this.valueChangesSubscription = this.equipmentForm.valueChanges.subscribe(
            res => {
              this.cmnServ.setUpdatedEquipmentToStore(this.equipmentForm.getRawValue());
              this.cmnServ.setIsFormValidToStore(this.equipmentForm.valid);
            }
          );
        }
      }
    );
  }

  /**
   * @description populate form with input equipment obj
   * @param equipment 
   */
  private populateForm(equipment?: Equipment) {
    this.equipmentForm.get('id')?.setValue(equipment?.id);
    this.equipmentForm.get('model')?.setValue(equipment?.model);
    this.equipmentForm.get('brand')?.setValue(equipment?.brand);
    this.equipmentForm.get('weight')?.setValue(equipment?.weight);
    this.equipmentForm.get('manufactureDate')?.setValue(equipment?.manufactureDate);
  }

  /**
   * @description clean up
   */
  ngOnDestroy(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
    if (this.equipmentSubscription) {
      this.equipmentSubscription.unsubscribe();
    }
    // reset store upon leave
    this.cmnServ.setIsFormValidToStore(false);
  }

}
