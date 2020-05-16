import { Layout } from './layout';
import { Permissao } from './permissao';

export class Usuario {

  constructor(init?:Partial<Usuario>) {
    Object.assign(this, init);
  }

  static newUsuario(values:any) : Usuario {
    return new Usuario(
      {
        id:values.id,
        nome:values.nome,
        email:values.email,
        cpf: values.cpf,
        ativo: values.ativo,
        sexo:values.sexo,
        tipoUsuario:values.tipoUsuario
      }
    );
  }

  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  layout: Layout;
  permissoes:Permissao[];
  ativo: boolean;
  sexo:string;
  tipoUsuario:string;

}
