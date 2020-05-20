import { Cidade } from './cidade';

export class Endereco{

  id:number;
  email:string;
  ddd:number;
  telefone:number;
  cep:number;
  rua:string;
  bairro:string;
  complemento:string;
  logradouro:string;
  cidade:Cidade;

  constructor(init?:Partial<Endereco>) {
    Object.assign(this, init);
  }

  static newEndereco(values:any) : Endereco {
    return new Endereco(
      {
        id:values.idEndereco,
        email:values.email,
        ddd:values.ddd,
        telefone:values.telefone,
        cep:values.cep,
        rua:values.rua,
        bairro:values.bairro,
        complemento:values.complemento,
        logradouro:values.logradouro,
        cidade:new Cidade({id:values.idCidade})
      }
    );
  }

}
