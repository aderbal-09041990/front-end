export class Fornecedor{

  id:number;
  tipoDocumento:TipoDocumento;
  numeroDocumento:string;
  ie:String;
  nome:string;
  fantasia:string;

  constructor(id:number,
              tipoDocumento:TipoDocumento,
              numeroDocumento:string,
              ie:String,
              nome:string,
              fantasia:string){
    this.id = id;
    this.tipoDocumento = tipoDocumento;
    this.numeroDocumento = numeroDocumento;
    this.ie = ie;
    this.nome = nome;
    this.fantasia = fantasia;

  }
}

export enum TipoDocumento{
  CPF,
  CNPJ
}
