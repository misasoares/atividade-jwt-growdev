import { Router } from "express";
import { AlunoController } from "../controllers";
import { avaliacaoRoutes } from "./avaliacao.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import { projetoRoutes } from "./projeto.routes";

export const alunoRoutes = () => {
  const router = Router();
  const controller = new AlunoController();

  router.get("/", controller.list);
  router.post("/", controller.create);
  router.put("/:id", [authMiddleware], controller.update);
  router.delete("/:id", controller.delete);
  router.post("/login", controller.login);


  router.get("/logged",authMiddleware(["T","M","F"]) ,controller.logged);

  router.use("/:idAluno/avaliacao", avaliacaoRoutes());
  router.use("/:alunoId/projeto", projetoRoutes());

  return router;
};
