import { Request, Response } from "express";

import repository from "../database/prisma.connection";
import { Turma } from "../models/turma.model";

/**
 * Controller com todas as ações a respeito de turmas.
 */
export class TurmaController {
  public async list(req: Request, res: Response) {
    try {
      // Lista todas as turmas do banco de dados

      const result = await repository.turma.findMany();

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
      // Busca os campos do body
      const { programa, edicao } = req.body;

      // Valida se todos os campos foram informados
      if (!programa || !edicao) {
        return res.status(400).send({
          ok: false,
          message: "Fields not provided",
        });
      }

      // Cria uma nova turma (model)
      const turma = new Turma(programa, edicao, 30);

      // Salva a turma no banco de dados
      const result = await repository.turma.create({
        data: {
          id: turma.id,
          programa,
          edicao,
          maxAlunos: 30,
        },
      });

      res.status(201).send({
        ok: true,
        data: result,
        message: "Turma successfully created",
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
