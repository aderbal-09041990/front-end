import { Estado } from './estado';

export class Cidade{

  id:number;
  codigoIBGE:number;
  nome:String;
  estado:Estado;

  constructor(id:number,
              codigoIBGE:number,
              nome:string,
              idEstado:number) {
    this.id = id;
    this.codigoIBGE = codigoIBGE;
    this.nome = nome;
    this.estado = new Estado(idEstado,null,null,null);
  }
}
