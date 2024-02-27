import { Router } from "express";
const router = Router();

//Controllers
import { getBusinessBookingData } from "../Controllers/schedular.js";;

//Middleware
import { agentMiddleware } from "../Middlwares/agent.js";

//Routes
router.get("/scheduler", agentMiddleware, getBusinessBookingData);


export default router;