export class Estado{

  id:number;
  codigo:number;
  nome:string;
  sigla:String;


  constructor(init?:Partial<Estado>) {
    Object.assign(this, init);
  }

  static newEstado(values:any) : Estado {
    return new Estado(
      {
        id:values.id,
        codigo:values.codigo,
        nome:values.nome,
        sigla:values.sigla
      }
    );
  }

}
