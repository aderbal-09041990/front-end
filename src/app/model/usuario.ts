import { Layout } from './layout';
import { Permissao } from './permissao';

export class Usuario {

  constructor(id:number,
              nome:string,
              sobreNome:string,
              email:string,
              cpf:string) {
    this.id = id;
    this.nome = nome;
    this.sobreNome = sobreNome;
    this.email = email;
    this.cpf = cpf;

    this.layout = new Layout();
	}

  public id: number;
  public nome: string;
  public sobreNome: string;
  public email: string;
  public senha: string;
  public cpf: string;
  public layout: Layout;
  public permissoes:Permissao[];


}
