import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipment } from 'src/app/models/equipment.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  equipments: Equipment[] = [];

  constructor(
    private router: Router,
    private cmnServ: CommonService
  ) { }

  ngOnInit(): void {
    this.getEquipments();
  }

  /**
   * @description calls service to get equipment list
   */
  private getEquipments() {
    this.cmnServ.getEquipments().subscribe(
      res => {
        this.equipments = res;
      }
    );
  }

  /**
   * @description redirect to create page
   */
  public onCreate() {
    this.router.navigate(['create']);
  }

}
