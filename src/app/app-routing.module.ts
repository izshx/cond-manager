import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'cadastro-usuario', loadChildren: () => import('./pages/cadastro-usuario/cadastro-usuario.module').then(m => m.CadastroUsuarioPageModule) },
  { path: 'cadastro-chamado', loadChildren: () => import('./pages/cadastro-chamado/cadastro-chamado.module').then(m => m.CadastroChamadoPageModule) },
  { path: 'detalhe-chamado', loadChildren: () => import('./pages/detalhe-chamado/detalhe-chamado.module').then(m => m.DetalheChamadoPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
