export interface CreateAlunoDTO {
  nome: string;
  email: string;
  idade: number;
  password: string;
  tipo: string;
}

export interface UpdateAlunoDTO {
  id: string;
  nome?: string;
  idade?: number;
  tipo?: string;
}
