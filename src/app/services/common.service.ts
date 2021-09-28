import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  readonly EQUIPMENTS_URL = `${environment.equipment}/equipments`;

  constructor(private http: HttpClient,) { }

  /**
   * @description Calls api to retrive equipment list
   * @returns
   */
  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.EQUIPMENTS_URL);
  }

  /**
   * @description Calls api to retrive equipment by id
   * @param id 
   * @returns 
   */
  getEquipmentById(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.EQUIPMENTS_URL}/${id}`);
  }

  /**
   * @description Calls api to update equipment by id
   * @param id 
   * @param payload equipment
   * @returns 
   */
  updateEquipmentById(id: string, payload: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.EQUIPMENTS_URL}/${id}`, payload);
  }


}
