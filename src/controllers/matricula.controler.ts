import { Request, Response } from "express";

import repository from "../database/prisma.connection";
import { Matricula } from "../models";

export class MatriculaController {
    public async list(req: Request, res: Response) {
        try {
            const { idTurma } = req.params;

            // Verifica se a turma existe
            const turma = await repository.turma.findUnique({
                where: {
                    id: idTurma,
                },
            });

            // Se a turma não existe, retorna 404
            if (!turma) {
                return res.status(404).send({
                    ok: false,
                    message: "Turma does not exist",
                });
            }

            // Lista todas as turmas do banco de dados
            const result = await repository.matricula.findMany({
                where: {
                    turmaId: idTurma,
                },
            });

            res.status(200).send({
                ok: true,
                data: result,
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { idTurma } = req.params;
            const { idAluno } = req.body;

            // Valida os campos obrigatórios
            if (!idAluno) {
                return res.status(400).send({
                    ok: false,
                    message: "Aluno ID not provided.",
                });
            }

            // Verifica se a turma existe
            const turma = await repository.turma.findUnique({
                where: {
                    id: idTurma,
                },
            });

            // Se a turma não existe, retorna 404
            if (!turma) {
                return res.status(404).send({
                    ok: false,
                    message: "Turma does not exist",
                });
            }

            // Verifica se o aluno existe
            const aluno = await repository.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });

            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno does not exist",
                });
            }

            // Verifica se já existe alguma matrícula para o aluno
            const matriculaExistente = await repository.matricula.findUnique({
                where: {
                    alunoId_turmaId: {
                        alunoId: aluno.id,
                        turmaId: turma.id,
                    },
                },
            });

            if (!!matriculaExistente) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno is already signed to Turma",
                });
            }

            // Cria a instância da matricula (model)
            const matricula = new Matricula(idTurma, idAluno, true);

            // Salva a avaliação no banco de dados
            const result = await repository.matricula.create({
                data: {
                    alunoId: aluno.id,
                    turmaId: turma.id,
                    ativo: true,
                },
            });

            res.status(201).send({
                ok: true,
                data: result,
                message: "Matricula successfully created",
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
