import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ChamadoService } from '../cadastro-chamado/chamado.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  chamados: any[];
  public usuarioLogado;
  constructor(private navCtrl: NavController,
    private chamadoService: ChamadoService) {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  }


  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.usuarioLogado.perfil === 0 ? this.obterPorUsuarioId(this.usuarioLogado.id) : this.obterTodos();
  }

  cadastrarChamado() {
    this.navCtrl.navigateForward('cadastro-chamado');

  }

  async obterTodos() {
    await this.chamadoService.obterTodos().then(resp => this.chamados = resp);
  }

  async obterPorUsuarioId(usuarioId) {
    await this.chamadoService.obterPorUsuarioId(usuarioId).then(resp => this.chamados = resp);
  }

  async fecharChamado(chamadoId) {
    await this.chamadoService.fecharChamado(chamadoId);
    this.obterTodos();
  }


  abrirDetalheChamado(chamado) {    
    this.navCtrl.navigateForward('/detalhe-chamado', { queryParams : chamado});
  }


}
