import { Router } from "express";
import businessAPI from "./businessAPI.js";
import clientAPI from "./clientAPI.js";
import commonAPI from "./commonAPI.js";

const router = Router();
router.use("/business", businessAPI);
router.use("/client", clientAPI);
router.use("/common", commonAPI);

export default router;