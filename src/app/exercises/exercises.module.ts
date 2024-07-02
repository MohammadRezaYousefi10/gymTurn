import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ExercisesPageRoutingModule } from './exercises-routing.module';

import { ExercisesPage } from './exercises.page';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalController } from '@ionic/angular/standalone';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExercisesPageRoutingModule,
    ModalComponent
    
    
  ],
  declarations: [ExercisesPage ]
})
export class ExercisesPageModule {}
