import { Router } from "express";
import unitController from "../controller/unit";
import unitMiddleWare from "../middleware/unit";
import { auth } from "../middleware/auth.middleware";
const router: Router = Router();

router.post("/create/:id", unitMiddleWare.create, auth, unitController.create);

export default router;
