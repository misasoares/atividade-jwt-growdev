import { CreateAlunoDTO, UpdateAlunoDTO } from "../dtos/aluno.dto";
import { Result } from "../dtos/service.dto";
import repository from "../database/prisma.connection";
import { Aluno } from "../models";

export class AlunoService {
  public async findAll(nome?: string): Promise<Aluno[]> {
    // Lista todos os alunos do banco de dados
    const result = await repository.aluno.findMany({
      // Filtro com where
      where: {
        nome: nome?.toString(),
      },
      // Define quais os campos serão selecionados
      select: {
        password: false,
        id: true,
        nome: true,
        email: true,
        idade: true,
        tipo: true,
        createdAt: true,
      },
    });

    return result.map((item: any) => this.mapToModel(item));
  }

  public async create(params: CreateAlunoDTO): Promise<Result> {
    // Cria um novo aluno (model)
    const aluno = new Aluno(params.nome, params.email, params.idade, params.password, params.tipo);

    // Salva o aluno no banco de dados usando o Prisma
    const createdAluno = await repository.aluno.create({
      data: {
        email: params.email,
        nome: params.nome,
        password: params.password,
        idade: params.idade,
        tipo: params.tipo,
      },
    });

    return {
      code: 201,
      message: "Aluno successfully created",
      data: this.mapToModel(createdAluno).toJson(),
    };
  }

  public async update(params: UpdateAlunoDTO): Promise<Result> {
    const aluno = await repository.aluno.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!aluno) {
      return {
        code: 404,
        message: "Aluno not found",
      };
    }

    aluno.nome = params.nome ?? aluno.nome;
    aluno.idade = params.idade ?? aluno.idade;

    await repository.aluno.update({
      where: {
        id: params.id,
      },
      data: {
        nome: aluno.nome,
        idade: aluno.idade,
      },
    });

    return {
      code: 200,
      message: "Aluno sucessfully updated",
      data: this.mapToModel(aluno).toJson(),
    };
  }

  public async delete(id: string): Promise<Result> {
    const aluno = await repository.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!aluno) {
      return {
        code: 404,
        message: "Aluno not found",
      };
    }

    await repository.aluno.delete({
      where: {
        id,
      },
    });

    return {
      code: 200,
      message: "Aluno successfully deleted",
    };
  }

  public mapToModel(aluno: any) {
    return new Aluno(aluno.nome, aluno.email, aluno.idade, aluno.password, aluno.id, aluno.tipo);
  }
}
