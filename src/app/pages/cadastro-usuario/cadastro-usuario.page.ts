import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { ToastController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {

  public cadForm: FormGroup;

  constructor(private usuarioService: UsuarioService,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.cadForm = this.formBuilder.group({
      nome: null,
      senha: null,
      login: null,
      confirmaSenha: null,
      perfil: null
    });
  }

  async onSubmit() {
    
    try {
      this.validarSenha();
      
      const usuario = {
        nome: this.cadForm.value.nome,
        login: this.cadForm.value.login,
        senha: this.cadForm.value.senha,
        perfil: this.cadForm.value.perfil,

      }

      const result = await this.usuarioService.salvar(usuario);


      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Usuário salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
      this.navCtrl.back();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: error,
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

  validarSenha() {
    const senha = this.cadForm.value.senha;
    const confirmaSenha = this.cadForm.value.confirmaSenha;
     if(senha !== confirmaSenha) {
      throw 'As senhas estão diferentes'
     }
  }

}
