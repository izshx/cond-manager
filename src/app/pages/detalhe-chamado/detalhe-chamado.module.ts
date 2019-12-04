import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalheChamadoPage } from './detalhe-chamado.page';
import { ChamadoService } from '../cadastro-chamado/chamado.service';

const routes: Routes = [
  {
    path: '',
    component: DetalheChamadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [
    ChamadoService
  ],
  declarations: [DetalheChamadoPage]
})
export class DetalheChamadoPageModule {}
