import { Router } from "express";
import { AlunoController } from "../controllers";
import { avaliacaoRoutes } from "./avaliacao.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

export const authRoutes = () => {
    const router = Router();
    const controller = new AlunoController();

    router.post("/", controller.login);

    return router;
};
