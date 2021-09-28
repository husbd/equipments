import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(private http: HttpClient,) { }

  /**
   * @description Calls api to retrive equipment list
   * @returns
   */
  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(environment.equipment);
  }

  /**
   * @description Calls api to retrive equipment by id
   * @param id 
   * @returns 
   */
  getEquipmentById(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${environment.equipment}/${id}`);
  }

  /**
   * @description Calls api to update equipment by id
   * @param id 
   * @param payload equipment
   * @returns 
   */
  updateEquipmentById(id: string, payload: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${environment.equipment}/${id}`, payload);
  }

  /**
   * @description Calls api to delete equipment by id
   * @param id
   * @returns 
   */
   deleteEquipmentById(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.equipment}/${id}`);
  }

  /**
   * @description Calls api to create equipment
   * @param payload equipment
   * @returns 
   */
   createEquipment(payload: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(environment.equipment, payload);
  }

}
