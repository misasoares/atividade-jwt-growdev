import { Request, Response } from "express";

import repository from "../database/prisma.connection";
import { Aluno } from "../models/aluno.model";
import { AlunoService } from "../services/aluno.service";
import { AuthService } from "../services/auth.service";

/**
 * Controller com todas as ações a respeito de alunos.
 */
export class AlunoController {
  public async list(req: Request, res: Response) {
    try {
      const { nome } = req.query;

      const service = new AlunoService();
      const result = await service.findAll(nome as string);

      res.status(200).send({
        ok: true,
        data: result.map((item) => item.toJson()),
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
      const { nome, email, password, idade, tipo } = req.body;

      // Valida se todos os campos foram informados
      if (!nome || !email || !password || !idade || !tipo) {
        return res.status(400).send({
          ok: false,
          message: "Fields not provided",
        });
      }

      const result = await new AlunoService().create(req.body);

      res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, idade } = req.body;

      const result = await new AlunoService().update({
        id,
        nome,
        idade,
      });

      res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await new AlunoService().delete(id);

      res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send({
          ok: false,
          message: "Fields not provided",
        });
      }

      const result = await new AuthService().login(email, password);

      res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async logged(req: Request, res: Response) {
    try {
      const user = req.user;
      
      res.status(200).send({ message: "aaaa", data: user });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
