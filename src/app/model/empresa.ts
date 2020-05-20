import { Endereco } from './endereco';

export class Empresa{

  id:number;
  nome:string;
  cnpj:number;
  descricao:string;
  ativo:boolean;
  endereco:Endereco;

  constructor(init?:Partial<Empresa>) {
    Object.assign(this, init);
  }

  static newEmpresa(values:any) : Empresa {
    return new Empresa(
      {
        id:values.id,
        nome:values.nome,
        cnpj:values.cnpj,
        descricao:values.descricao,
        ativo:values.ativo,
        endereco : Endereco.newEndereco(values)
      }
    );
  }
}
