import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipment } from 'src/app/models/equipment.model';
import { CommonService } from 'src/app/services/common.service';
import { EquipmentFormComponent } from 'src/app/shared/forms/equipment-form/equipment-form.component';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private router: Router,
    private cmnServ: CommonService,
    private modalServ: ModalService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * @description call service to create new equipment and redirect to detail page
   * @param payload 
   */
  private createEquipment(payload: Equipment) {
    this.cmnServ.createEquipment(payload).subscribe(
      res => {
        this.openModal('Created new equipment successfully!');
        this.router.navigate(['detail', res.id]);
      }
    );
  }

  /**
   * @description on submit handler def
   */
  public onSubmit(formComponent: EquipmentFormComponent) {
    const payload = formComponent.getCurrentEquipment();
    this.createEquipment(payload);
  }

  /**
   * @description open a modal and show msg
   */
   private openModal(info: string) {
    this.modalServ.open(info);
  }

}
