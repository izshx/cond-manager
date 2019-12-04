import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../cadastro-usuario/usuario.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: null,
      senha: null
    });
  }

  async logar() {
    
    if(this.loginForm.value.login == null || this.loginForm.value.senha == null){
      this.erroToast('Usuário e senha são campos obrigatórios!')
    } else {
      await this.usuarioService.obterPorLogin(this.loginForm.value.login)
       .then(async (resp) => {
         if(resp.login == this.loginForm.value.login && resp.senha == this.loginForm.value.senha) {
           this.navCtrl.navigateForward('home');

           localStorage.setItem('usuarioLogado', JSON.stringify(resp));

           const toast = await this.toastCtrl.create({
             header: 'Sucesso',
             message: `Seja bem-vindo(a) ${resp.nome}`,
             color: 'success',
             position: 'bottom',
             duration: 1000
           });
     
           toast.present();
         } else {
           const toast = await this.toastCtrl.create({
             header: 'Erro',
             message: 'Usuário ou senha inválida',
             color: 'danger',
             position: 'bottom',
             duration: 1000
           });
     
           toast.present();
         }
       });
    }

  
  }

  async erroToast(msg){
    const toast = await this.toastCtrl.create({
      header: 'Erro',
      message: msg,
      color: 'danger',
      position: 'bottom',
      duration: 1000
    });

    toast.present();
  }

}
