export interface CreateProjetoDto {
    descricao: string;
    ferramenta: string;
    alunoId: string;
}

export interface DeleteProjetoDto {
    alunoId: string;
    id: string;
}

export interface UpdateProjetoDto {
    alunoId: string;
    id: string;
    descricao?: string;
    ferramenta?: string;
    status?: string;
}
