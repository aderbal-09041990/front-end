export class Produto{

  id:number;
  codigo:string;
  nome:string;
  codigoFabrica:string;
  volumes:number;
  shelfLife:number;
  percentualShelfLife:number;
  controleTemperatura:boolean;
  temperaturaMinima:number;
  temperaturaMaxima:number;
  existeCodigoBarra:boolean;
  controleLote:boolean;
  controleVencto:boolean;

  constructor(id:number,
              codigo:string,
              nome:string,
              codigoFabrica:string,
              volumes:number,
              shelfLife:number,
              percentualShelfLife:number,
              controleTemperatura:boolean,
              temperaturaMinima:number,
              temperaturaMaxima:number,
              existeCodigoBarra:boolean,
              controleLote:boolean,
              controleVencto:boolean){
    this.id = id,
    this.codigo = codigo,
    this.nome = nome,
    this.codigoFabrica = codigoFabrica,
    this.volumes = volumes,
    this.shelfLife = shelfLife,
    this.percentualShelfLife = percentualShelfLife,
    this.controleTemperatura = controleTemperatura,
    this.temperaturaMinima = temperaturaMinima,
    this.temperaturaMaxima = temperaturaMaxima,
    this.existeCodigoBarra = existeCodigoBarra,
    this.controleLote = controleLote,
    this.controleVencto = controleVencto
  }
}
