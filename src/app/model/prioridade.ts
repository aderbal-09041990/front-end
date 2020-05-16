export class Prioridade{

  id:number;
  descricao:string;
  ativo:boolean;

  constructor(init?:Partial<Prioridade>) {
    Object.assign(this, init);
  }

  static newPrioridade(values:any) : Prioridade {
    return new Prioridade(
      {
        id:values.id,
        descricao:values.descricao,
        ativo:values.ativo
      }
    );
  }
}
