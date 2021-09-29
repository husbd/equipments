import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment.model';
import { setIsCreate, setIsFormValid, updateEquipment, updateUpdatedEquipment } from '../shared/forms/equipment-form/store/equipment-form.actions';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) { }

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

  // store methods

  /**
   * @description dispatch action to set create mode
   * @param payload 
   */
  setIsCreateToStore(payload: boolean): void {
    this.store.dispatch(
      setIsCreate({isCreate: payload})
    );
  }

  /**
   * @description select isCreate from store
   */
   getIsCreateFromStore(): Observable<boolean | undefined> {
    return this.store.select('editEquipment', 'isCreate');
  }

  /**
   * @description dispatch action to set form valid
   * @param payload 
   */
  setIsFormValidToStore(payload: boolean): void {
    this.store.dispatch(
      setIsFormValid({isFormValid: payload})
    );
  }

  /**
   * @description select isFormValid from store
   */
   getIsFormValidFromStore(): Observable<boolean | undefined> {
    return this.store.select('editEquipment', 'isFormValid');
  }

  /**
   * @description dispatch action to set current equipment
   * @param payload 
   */
  setEquipmentToStore(payload: Equipment): void {
    this.store.dispatch(
      updateEquipment({equipment: payload})
    );
  }

  /**
   * @description select equipment from store
   */
   getEquipmentFromStore(): Observable<Equipment | undefined> {
    return this.store.select('editEquipment', 'equipment');
  }

  /**
   * @description dispatch action to set updated equipment
   * @param payload 
   */
  setUpdatedEquipmentToStore(payload: Equipment): void {
    this.store.dispatch(
      updateUpdatedEquipment({equipment: payload})
    );
  }

  /**
   * @description select updated equipment from store
   */
  getUpdatedEquipmentFromStore(): Observable<Equipment | undefined> {
    return this.store.select('editEquipment', 'updatedEquipment');
  }

}
