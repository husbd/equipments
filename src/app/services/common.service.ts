import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  readonly GET_EQUIPMENTS_URL = `${environment.equipment}/equipments`;

  constructor(private http: HttpClient,) { }

  /**
   * @description Calls api to retrive equipment list
   * @returns 
   */
  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.GET_EQUIPMENTS_URL);
  }
}
