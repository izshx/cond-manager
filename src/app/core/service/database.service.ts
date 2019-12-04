import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  db: SQLiteObject;
  databaseName: string = 'condManager.db';

  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter) {  }

  async openDatabase() {
    try {
      this.getCreateTable();
      
    } catch (error) {
      console.error('Ocorreu um erro ao criar o banco de dados', error);
    }
  }


  private getCreateTable() {

    const sqls = [];
    sqls.push('');

    this.sqlite.create({
      name: this.databaseName,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT NOT NULL, senha TEXT NOT NULL, login TEXT NOT NULL, perfil integer NOT NULL );', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

         this.db.executeSql('CREATE TABLE IF NOT EXISTS chamados (id integer primary key AUTOINCREMENT NOT NULL, titulo TEXT NOT NULL, numero_ap integer, bloco TEXT, local TEXT, descricao TEXT NOT NULL, status integer NOT NULL, usuarios_id integer, FOREIGN KEY(usuarios_id) REFERENCES usuarios(id));', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      });

  }

  executarSQL(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }
}
