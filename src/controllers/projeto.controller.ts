import { Request, Response } from "express";
import { ProjetoService } from "../services/projeto.service";

export class ProjetoController {
    public async list(req: Request, res: Response) {
        try {
            const { alunoId } = req.params;

            const service = new ProjetoService();
            const result = await service.list(alunoId);

            res.status(result.code).send(result);
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
            const { descricao, ferramenta } = req.body;
            const { alunoId } = req.params;

            // Valida se todos os campos foram informados
            if (!descricao || !ferramenta) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided",
                });
            }

            const result = await new ProjetoService().create({
                descricao,
                ferramenta,
                alunoId,
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
            const { alunoId, id } = req.params;

            const service = new ProjetoService();
            const result = await service.delete({ alunoId, id });

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
            const { alunoId, id } = req.params;

            const service = new ProjetoService();
            const result = await service.update({ alunoId, id, ...req.body });

            res.status(result.code).send(result);
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
