import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import repository from "../database/prisma.connection";
import { Console } from "console";

export function authMiddleware(permissao?: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).send({
          ok: false,
          message: "Authentication token not provided",
        });
      }

      const [, token] = authHeader.split(" ");

      verify(token, `${process.env.JWT_SECRET}`, async (err: any, user: any) => {
        if (err) return res.status(401).json({ message: `Erro no verify: ${err}` });

        req.user = user.result;

        if (permissao && user) {
          const hasPermission = permissao.map((p) => user.result.tipo === p);

          if (!hasPermission.some((auth) => auth === false)) {
            return res.status(403).json({ message: "Permissão negada. AQUI" });
          } else {
            next();
          }
        }
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  };
}
