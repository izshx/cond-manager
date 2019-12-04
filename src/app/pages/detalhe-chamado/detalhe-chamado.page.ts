import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalhe-chamado',
  templateUrl: './detalhe-chamado.page.html',
  styleUrls: ['./detalhe-chamado.page.scss'],
})
export class DetalheChamadoPage implements OnInit {
  chamado;
  detForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.detForm = this.formBuilder.group({
      titulo:  null,
      numeroAP:  null,
      bloco:  null,
      local:  null,
      descricao:  null
    });
  }

  ionViewWillEnter() {
    let chamado = this.activatedRoute.snapshot.queryParams
    this.detForm.controls.titulo.setValue(chamado.titulo);
    this.detForm.controls.numeroAP.setValue(chamado.numero_ap);
    this.detForm.controls.bloco.setValue(chamado.bloco);
    this.detForm.controls.local.setValue(chamado.local);
    this.detForm.controls.descricao.setValue(chamado.descricao);
  }

}
