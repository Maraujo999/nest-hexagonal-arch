export class User {
  id: string;

  nome: string;

  email: string;

  password: string;

  constructor(id: string, nome: string, email: string, password: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.password = password;
  }
}
