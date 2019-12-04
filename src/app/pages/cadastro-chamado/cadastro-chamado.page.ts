import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { ChamadoService } from './chamado.service';

@Component({
  selector: 'app-cadastro-chamado',
  templateUrl: './cadastro-chamado.page.html',
  styleUrls: ['./cadastro-chamado.page.scss'],
})
export class CadastroChamadoPage implements OnInit {
  cadForm: FormGroup;
  public usuarioLogado;
  constructor(private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private chamadoService: ChamadoService) {
    this.usuarioLogado =  JSON.parse(localStorage.getItem('usuarioLogado'));
   }

  ngOnInit() {
    this.cadForm = this.formBuilder.group({
      titulo: null,
      numeroAP: null,
      bloco: null,
      local: null,
      descricao: null
    });
  }

  async onSubmit() {
    
    try {
      
      const chamado = {
        ...this.cadForm.value,
        usuarioId: this.usuarioLogado.id

      }

      const retorno = await this.chamadoService.salvar(chamado);
      console.log('retorno do salvar: ', retorno);
      
      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Chamado salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
      this.navCtrl.navigateBack('/home');
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

}
