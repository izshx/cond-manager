import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  db: SQLiteObject;
  databaseName: string = 'condManager.db';

  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter) { }

  async openDatabase() {
    try {
      this.db = await this.sqlite.create({ name: this.databaseName, location: 'default' });
      await this.createDatabase();
      console.log('Criou a base da dados com sucesso!');
      
    } catch (error) {
      console.error('Ocorreu um erro ao criar o banco de dados', error);
    }
  }

  async createDatabase() {
    const sqlCreateDatabase = this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDatabase);
    return result ? true : false;
  }

  private getCreateTable() {

    const sqls = [];
    sqls.push('CREATE TABLE IF NOT EXISTS usuarios (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT NOT NULL, senha TEXT NOT NULL, login TEXT NOT NULL, perfil integer NOT NULL )');
    sqls.push('CREATE TABLE IF NOT EXISTS chamados (id integer primary key AUTOINCREMENT NOT NULL, titulo TEXT NOT NULL, numero_ap integer, bloco TEXT, local TEXT, descricao TEXT NOT NULL, status integer NOT NULL, usuarios_id integer, FOREIGN KEY(usuarios_id) REFERENCES usuarios(id))');
    return sqls.join('\n');
  }

  executarSQL(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }
}
