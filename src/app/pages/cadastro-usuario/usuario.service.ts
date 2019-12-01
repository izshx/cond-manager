import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';

@Injectable()
export class UsuarioService {

  constructor(private db: DatabaseService) { }

  salvar(usuario: any) {
    return this.inserir(usuario);
  }

  private async inserir(usuario: any) {
    // const lUsuario = await this.obterPorLogin(usuario.login);

    // if(lUsuario) {
    //   if (lUsuario.nome == usuario.nome) {
    //     throw "Login de usuário já existe";
    //   } 
    // } else {
      const sql = 'insert into usuarios (nome, senha, login, perfil) values (?, ?, ?, ?)';
      const data = [usuario.nome, usuario.senha, usuario.login, usuario.perfil ? 1 : 0];

      return this.db.executarSQL(sql, data);
    // }
    
  }

  async obterPorLogin(login) {
    const sql = 'select * from usuarios where login = ?';
    const data = [login];
    const result = await this.db.executarSQL(sql, data);
    const rows = result.rows;
    let usuario = { id: null, nome: null, login: null, perfil: null, senha: null };
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      usuario.id = item.id;
      usuario.login = item.login;
      usuario.nome = item.nome;
      usuario.perfil = item.perfil;
      usuario.senha = item.senha;
    }

    return usuario;
  }


}
