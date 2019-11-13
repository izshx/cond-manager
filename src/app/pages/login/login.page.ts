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

  logar() {
     this.usuarioService.obterPorLogin(this.loginForm.value.login)
      .then(async (resp) => {
        if(resp.senha == this.loginForm.value.senha){
          this.navCtrl.navigateForward('home');
        } else {
          const toast = await this.toastCtrl.create({
            header: 'Erro',
            message: 'Senha inválida',
            color: 'danger',
            position: 'bottom',
            duration: 3000
          });
    
          toast.present();
        }
      });
  
  }

}
