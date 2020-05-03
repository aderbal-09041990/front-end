export class Estado{

  id:number;
  codigo:number;
  nome:string;
  sigla:String;

  constructor(id:number,
              codigo:number,
              nome:string,
              sigla:string) {
    this.id = id;
    this.codigo = codigo;
    this.nome = nome;
    this.sigla = sigla;

  }

}
