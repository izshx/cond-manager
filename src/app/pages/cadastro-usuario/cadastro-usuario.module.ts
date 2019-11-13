import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroUsuarioPage } from './cadastro-usuario.page';
import { UsuarioService } from './usuario.service'

const routes: Routes = [
  {
    path: '',
    component: CadastroUsuarioPage
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
  declarations: [CadastroUsuarioPage],
  providers: [
    UsuarioService
  ]
})
export class CadastroUsuarioPageModule {}
