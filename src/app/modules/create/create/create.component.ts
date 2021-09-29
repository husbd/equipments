import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Equipment } from 'src/app/models/equipment.model';
import { CommonService } from 'src/app/services/common.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  isFormValid$?: Observable<boolean | undefined>;

  constructor(
    private router: Router,
    private cmnServ: CommonService,
    private modalServ: ModalService,
  ) { }

  ngOnInit(): void {
    this.cmnServ.setIsCreateToStore(true);
    this.isFormValid$ = this.cmnServ.getIsFormValidFromStore();
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
      },
      err => {
        this.openModal('API Failure');
      }
    );
  }

  /**
   * @description on submit handler def
   */
  public onSubmit() {
    this.cmnServ.getUpdatedEquipmentFromStore().pipe(take(1))
    .subscribe(
      res => {
        if (res) {
          this.createEquipment(res);
        } else {
          this.openModal('No change detacted!');
        }
      }
    );
  }

  /**
   * @description confirm before redirect to list screen
   */
  public redirectToList() {
    if (confirm('Your changes are not saved yet. Are you sure to leave this page?')) {
      this.router.navigate(['list']);
    }
  }

  /**
   * @description open a modal and show msg
   */
   private openModal(info: string) {
    this.modalServ.open(info);
  }

}
