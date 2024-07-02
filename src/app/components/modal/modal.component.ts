import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

import { IonModal, IonHeader, IonToolbar, IonButtons , IonBackButton, IonTitle, IonButton, IonIcon, IonContent, IonItem, IonText , IonThumbnail} from "@ionic/angular/standalone";

@Component({
  standalone: true,
  imports : [IonModal , IonicModule , CommonModule , FormsModule,
     IonToolbar , IonHeader , IonButtons , IonBackButton , IonTitle,
    IonButton , IonIcon , IonContent , IonText , IonThumbnail , IonItem 
    ] ,
  selector: 'app-modal',
  template:`
  
  <ion-header >
    
  <ion-toolbar>
  <ion-title>{{ item.label }}</ion-title>
  <ion-buttons slot="end">
  <ion-button (click)="dismissModal()">Close</ion-button>
  </ion-buttons>
  </ion-toolbar>
  </ion-header>
  
  <ion-content>
  <ion-thumbnail>
  <img src="">
  </ion-thumbnail>
  <ion-label>
  <h2>{{ item.label }}</h2>
  <p>{{ item.description }}</p>
  </ion-label>

  </ion-content>
   `,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  {
  @Input() item : any;
  constructor(public modalController : ModalController) { }


  dismissModal(){
    this.modalController.dismiss();
  }
  
}
