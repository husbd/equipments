import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  private element: any;
  infoText: string = '';

  constructor(private modalServ: ModalService, private el: ElementRef) {
    this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
    // set modal component to service
    this.modalServ.setModal(this);
    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });
  }

  /**
   * @description open modal with css & class
   */
  open(info: string): void {
    this.infoText = info;
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
    // auto close modal after 2s 
    setTimeout(() => this.close(), 2000);
  }

  /**
   * @description close modal with css & class
   */
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.infoText = '';
  }

  /**
   * @description clean up
   */
  ngOnDestroy(): void {
    this.element.remove();
  }

}
