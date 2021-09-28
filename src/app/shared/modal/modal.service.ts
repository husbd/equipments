import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: ModalComponent | undefined;
  
  constructor() { }

  /**
   * @description set model
   * @param modal 
   */
  setModal(modal: ModalComponent) {
    this.modal = modal;
  }

  /**
   * @description open modal
   * @param info text to show in modal
   */
  open(info: string) {
    if (this.modal !== null && this.modal !== undefined) {
      this.modal.open(info);
    }
  }

  /**
   * @description close model
   */
  close() {
    if (this.modal !== null && this.modal !== undefined) {
      this.modal.close();
    }
  }
}
