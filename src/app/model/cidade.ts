import { Estado } from './estado';

export class Cidade{

  id:number;
  codigoIBGE:number;
  nome:String;
  estado:Estado;

  constructor(init?:Partial<Cidade>) {
    Object.assign(this, init);
  }

  static newCidade(values:any) : Cidade {
    return new Cidade(
      {
        id:values.id,
        codigoIBGE:values.codigoIBGEcodigoIBGE,
        nome:values.nome,
        estado:new Estado({id:values.idEstado})
      }
    );
  }
}
