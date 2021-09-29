import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Equipment } from 'src/app/models/equipment.model';
import { CommonService } from 'src/app/services/common.service';
import { ModalService } from 'src/app/shared/modal/modal.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  equipment?: Equipment;
  isFormValid$?: Observable<boolean | undefined>;
  paramSubscription?: Subscription;

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
    this.paramSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const _id = params.get('id') as string;
        // check if id is empty
        if (_id !== null && _id !== undefined && _id !== '') {
          this.getEquipmentById(_id);
        } else {
          this.openModal('please provide a valid id!');
          // redirect to list screen if failed to get id
          this.router.navigate(['list']);
        }
      }
    );

    this.isFormValid$ = this.cmnServ.getIsFormValidFromStore();
  }

  /**
   * @description call service to get detail by id
   * @param id 
   */
  private getEquipmentById(id: string) {
    this.cmnServ.getEquipmentById(id).subscribe(
      res => {
        this.equipment = res;
        this.cmnServ.setEquipmentToStore(res);
        this.cmnServ.setIsCreateToStore(false);
      },
      err => {
        this.openModal('API Failure');
        // redirect to list screen if failed to get equipment by id
        this.router.navigate(['list']);
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
      },
      err => {
        this.openModal('API Failure');
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
      },
      err => {
        this.openModal('API Failure');
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
  public onSubmit() {
    this.cmnServ.getUpdatedEquipmentFromStore().pipe(take(1))
    .subscribe(
      res => {
        if (res) {
          this.updateEquipmentById(res);
        } else {
          this.openModal('No change detacted!');
        }
      }
    );
  }

  /**
   * @description open a modal and show msg
   */
  private openModal(info: string) {
    this.modalServ.open(info);
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

}
