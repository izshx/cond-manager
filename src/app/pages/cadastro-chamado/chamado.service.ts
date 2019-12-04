import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';

@Injectable()
export class ChamadoService {

  constructor(private db: DatabaseService) { }

  salvar(chamado: any) {
    return this.inserir(chamado);
  }

  private async inserir(chamado: any) {
    console.log('chamado inserido: ', chamado);
    
    const sql = 'insert into chamados (titulo, numero_ap, bloco, local, descricao, status, usuarios_id) values (?, ?, ?, ?, ?, ?, ?)';
    const data = [chamado.titulo, chamado.numeroAP, chamado.bloco, chamado.local, chamado.descricao, 0, chamado.usuarioId];

    return this.db.executarSQL(sql, data);
  }

  async obterTodos() {
    const sql = 'select * from chamados';
    const result = await this.db.executarSQL(sql);
    const rows = result.rows;
    let chamados: any[] = [];
    
    if (rows && rows.length > 0) {
      for (let index = 0; index < rows.length; index++) {
        chamados.push(rows.item(index));
      }

    }    
    return chamados;
  }

  async obterPorUsuarioId(usuarioId) {
    const sql = 'select * from chamados where usuarios_id = ?';
    const data = [usuarioId];

    const result = await this.db.executarSQL(sql, data);
    const rows = result.rows;
    let chamados: any[] = [];
    
    if (rows && rows.length > 0) {
      for (let index = 0; index < rows.length; index++) {
        chamados.push(rows.item(index));
      }

    }    
    return chamados;
  }

  async obterPorId(id) {
    const sql = 'select * from chamados where id = ?';
    const data = [id];

    const result = await this.db.executarSQL(sql, data);
    const rows = result.rows;
    let chamado: any;
    
    if (rows && rows.length > 0) {
        chamado = rows.item(0);
    }    
    return chamado;
  }

  async fecharChamado(chamadoId) {
    const sql = 'update chamados set status = 1 where id = ?';
    const data = [chamadoId];

   return await this.db.executarSQL(sql, data);
  }

}
