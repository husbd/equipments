import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Equipment } from 'src/app/models/equipment.model';
import { CommonService } from 'src/app/services/common.service';
import { ModalService } from 'src/app/shared/modal/modal.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  equipmentForm = this.fb.group({
    id: new FormControl({value: '', disabled: true}, Validators.required),
    model: new FormControl('', Validators.required),
    brand: new FormControl(''),
    weight: new FormControl(''),
    manufactureDate: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cmnServ: CommonService,
    private modalServ: ModalService,
    
  ) { }

  /**
   * @description get id from query param & get detail by id 
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = params.get('id') as string;
        this.getEquipmentById(id);
      }
    );
  }

  /**
   * @description call service to get detail by id
   * @param id 
   */
  private getEquipmentById(id: string) {
    this.cmnServ.getEquipmentById(id).subscribe(
      res => {
        this.populateForm(res);
      }
    );
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
   * @description call service to update equipment by id
   */
  private updateEquipmentById() {
    const payload = this.equipmentForm.getRawValue();
    this.cmnServ.updateEquipmentById(payload.id, payload).subscribe(
      res => {
        this.openModal('Updated equipment successfully!');
      }
    );
  }

  private deleteEquipmentById(id: string) {
    this.cmnServ.deleteEquipmentById(id).subscribe(
      res => {
        this.openModal('Equipment deleted successfully!');
        this.router.navigate(['list']);
      }
    )
  }

  public onDelete() {
    const idControl = this.equipmentForm.get('id');
    if (idControl !== null && idControl !== undefined) {
      const _id = idControl.value;
      if(confirm(`Are you sure to delete ${_id}?`)) {
        this.deleteEquipmentById(_id);
      }
    }
  }

  /**
   * @description on submit handler def
   */
  public onSubmit() {
    this.updateEquipmentById();
  }

  /**
   * @description open a modal and show msg
   */
  private openModal(info: string) {
    this.modalServ.open(info);
  }

}
