import { Router } from "express";
import { MatriculaController } from "../controllers";

export const matriculaRoutes = () => {
    const router = Router({
        mergeParams: true,
    });
    const controller = new MatriculaController();

    router.get("/", controller.list);
    router.post("/", controller.create);

    return router;
};
