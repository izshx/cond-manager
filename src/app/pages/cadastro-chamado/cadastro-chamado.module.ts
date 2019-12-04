import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroChamadoPage } from './cadastro-chamado.page';
import { ChamadoService } from './chamado.service';

const routes: Routes = [
  {
    path: '',
    component: CadastroChamadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ChamadoService
  ],
  declarations: [CadastroChamadoPage]
})
export class CadastroChamadoPageModule {}
