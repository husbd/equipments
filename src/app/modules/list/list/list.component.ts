import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/models/equipment.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  equipments: Equipment[] = [];

  constructor(private cmnServ: CommonService) { }

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
        console.log(res);
      }
    )
  }

}
