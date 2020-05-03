import { Layout } from './layout';
import { Permissao } from './permissao';

export class Usuario {

  constructor(id:number,
              nome:string,
              email:string,
              cpf:string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;

    this.layout = new Layout();
	}

  public id: number;
  public nome: string;
  public email: string;
  public senha: string;
  public cpf: string;
  public layout: Layout;
  public permissoes:Permissao[];


}
