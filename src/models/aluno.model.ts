import { Avaliacao } from "./avaliacao.model";

export class Aluno {
  private _avaliacoes: Avaliacao[];

  constructor(private _nome: string, private _email: string, private _idade: number, private _password: string, private _id?: string, private _tipo?: string) {
    this._avaliacoes = [];
  }

  public get id() {
    return this._id;
  }

  public get nome() {
    return this._nome;
  }

  public get avaliacoes() {
    return this._avaliacoes;
  }
  public get tipo() {
    return this._tipo;
  }

  public toJson() {
    return {
      id: this._id,
      nome: this._nome,
      email: this._email,
      idade: this._idade,
      tipo: this._tipo,
    };
  }
}
