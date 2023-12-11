import { Router } from "express";
import { ProjetoController } from "../controllers/projeto.controller";

export const projetoRoutes = () => {
    const router = Router({
        mergeParams: true,
    });
    const controller = new ProjetoController();

    router.get("/", controller.list);
    router.post("/", controller.create);
    router.delete("/:id", controller.delete);
    router.put("/:id", controller.update);

    return router;
};
