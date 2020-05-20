export class Login{

  constructor(init?:Partial<Login>) {
    Object.assign(this, init);
  }

  email:string;
  senha:string;

}
