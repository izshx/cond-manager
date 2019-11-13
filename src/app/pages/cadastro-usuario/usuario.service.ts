import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';

@Injectable()
export class UsuarioService {

  constructor(private db: DatabaseService) { }

  salvar(usuario: any) {
    return this.inserir(usuario);

  }

  private async inserir(usuario: any) {
    let lUsuario;
    await this.obterPorLogin(usuario.login).then(resp => lUsuario = resp);
    
    if (lUsuario.nome == usuario.nome) {
      throw "Login de usuário já existe";
    } else {
      const sql = 'insert into usuarios (nome, senha, login, perfil) values (?, ?, ?, ?)';
      const data = [usuario.nome, usuario.senha, usuario.login, usuario.perfil ? 1 : 0];

      return this.db.executarSQL(sql, data);
    }
  }

  async obterPorLogin(login) {
    const sql = 'select * from usuarios where login = ?';
    const data = [login];
    const result = await this.db.executarSQL(sql, data);
    const rows = result.rows;
    const usuario = null;
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      usuario.id = item.id;
      usuario.nome = item.nome;
      usuario.senha = item.senha;
      usuario.login = item.login;
      usuario.perfil = item.perfil;
    }
    return usuario;
  }


}
