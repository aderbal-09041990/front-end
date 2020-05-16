export class Status{

  id:number;
  descricao:string;
  ativo:boolean;

  constructor(init?:Partial<Status>) {
    Object.assign(this, init);
  }

  static newStatus(values:any) : Status {
    return new Status(
      {
        id:values.id,
        descricao:values.descricao,
        ativo:values.ativo
      }
    );
  }
}
