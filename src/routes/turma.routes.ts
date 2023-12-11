import { Router } from "express";
import { TurmaController } from "../controllers/turma.controller";
import { matriculaRoutes } from "./matricula.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

export const turmaRoutes = () => {
  const router = Router();
  const controller = new TurmaController();

  router.get("/", authMiddleware, controller.list);
  router.post("/", controller.create);

  router.use("/:idTurma/matricula", matriculaRoutes());

  return router;
};
