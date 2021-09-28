import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Equipment } from 'src/app/models/equipment.model';
import { CommonService } from 'src/app/services/common.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { EquipmentFormComponent } from 'src/app/shared/forms/equipment-form/equipment-form.component';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  equipment: Equipment | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
        this.equipment = res;
      }
    );
  }

  /**
   * @description call service to update equipment by id
   */
  private updateEquipmentById(payload: Equipment) {
    this.cmnServ.updateEquipmentById(payload.id, payload).subscribe(
      res => {
        this.openModal('Updated equipment successfully!');
      }
    );
  }

  /**
   * @description call service to delete equipment by id
   * @param id 
   */
  private deleteEquipmentById(id: string) {
    this.cmnServ.deleteEquipmentById(id).subscribe(
      res => {
        this.openModal('Equipment deleted successfully!');
        this.router.navigate(['list']);
      }
    )
  }

  /**
   * @description on delete click handler def
   */
  public onDelete() {
    const _id = this.equipment?.id;
    if (_id !== null && _id !== undefined && _id !== '') {
      if(confirm(`Are you sure to delete ${_id}?`)) {
        this.deleteEquipmentById(_id);
      }
    }
  }

  /**
   * @description on submit handler def
   */
  public onSubmit(formComponent: EquipmentFormComponent) {
    const payload = formComponent.getCurrentEquipment();
    this.updateEquipmentById(payload);
  }

  /**
   * @description open a modal and show msg
   */
  private openModal(info: string) {
    this.modalServ.open(info);
  }

}
