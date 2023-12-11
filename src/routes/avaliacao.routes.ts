import { Router } from "express";
import { AvaliacaoController } from "../controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

export const avaliacaoRoutes = () => {
  const router = Router({
    mergeParams: true,
  });
  const controller = new AvaliacaoController();

  router.get("/", authMiddleware(["M", "T", "F"]), controller.list);
  router.post("/", authMiddleware(["M", "T"]), controller.create);
  router.put("/", authMiddleware(["T"]), controller.update);
  router.delete("/", authMiddleware(["T"]), controller.delete);

  return router;
};
