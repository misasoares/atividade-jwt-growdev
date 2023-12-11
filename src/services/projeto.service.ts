import repository from "../database/prisma.connection";
import {
    CreateProjetoDto,
    DeleteProjetoDto,
    UpdateProjetoDto,
} from "../dtos/projeto.dto";
import { Result } from "../dtos/service.dto";
import { Projeto } from "../models/projeto.model";

export class ProjetoService {
    public async create(params: CreateProjetoDto): Promise<Result> {
        const aluno = await repository.aluno.findFirst({
            where: {
                id: params.alunoId,
            },
        });

        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }

        const projeto = new Projeto(params.descricao, params.ferramenta, "E");

        await repository.projeto.create({
            data: {
                descricao: params.descricao,
                ferramenta: params.ferramenta,
                status: projeto.status,
                alunoId: params.alunoId,
            },
        });

        return {
            code: 201,
            message: "Projeto criado com sucesso",
            data: projeto.toJson(),
        };
    }

    public async list(alunoId: string): Promise<Result> {
        const aluno = await repository.aluno.findFirst({
            where: {
                id: alunoId,
            },
        });

        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }

        const result = await repository.projeto.findMany({
            where: {
                alunoId,
            },
        });

        return {
            code: 200,
            message: "Projetos listados com sucesso",
            data: result.map((item: any) => this.mapToModel(item).toJson()),
        };
    }

    public async delete(params: DeleteProjetoDto): Promise<Result> {
        // Verifica se o user existe
        const aluno = await repository.aluno.findFirst({
            where: {
                id: params.alunoId,
            },
        });

        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }

        // Verifica se o projeto existe
        const projeto = await repository.projeto.findFirst({
            where: {
                id: params.id,
            },
        });

        if (!projeto) {
            return {
                code: 404,
                message: "Projeto not found",
            };
        }

        await repository.projeto.delete({
            where: {
                id: params.id,
            },
        });

        return {
            code: 200,
            message: "Projeto sucessfully deleted",
        };
    }

    public async update(params: UpdateProjetoDto): Promise<Result> {
        // Verifica se o user existe
        const aluno = await repository.aluno.findFirst({
            where: {
                id: params.alunoId,
            },
        });

        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }

        // Verifica se o projeto existe
        const projeto = await repository.projeto.findFirst({
            where: {
                id: params.id,
            },
        });

        if (!projeto) {
            return {
                code: 404,
                message: "Projeto not found",
            };
        }

        await repository.projeto.update({
            where: {
                id: params.id,
            },
            data: {
                descricao: params.descricao,
                ferramenta: params.ferramenta,
                status: params.status,
            },
        });

        return {
            code: 200,
            message: "Projeto sucessfully updated",
        };
    }

    public mapToModel(projeto: any) {
        const model = new Projeto(
            projeto.descricao,
            projeto.ferramenta,
            projeto.status
        );

        model.id = projeto.id;

        return model;
    }
}
