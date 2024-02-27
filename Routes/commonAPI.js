import { Router } from "express";
const router = Router();

//Controllers
import { getUsers, getAgents, createUser } from "../Controllers/user.js";

//Middleware
import { agentMiddleware, adminAgentMiddleware } from "../Middlwares/agent.js";

//Routes
router.get("/users", agentMiddleware, getUsers);

router.use(adminAgentMiddleware)
router.post("/user", createUser);
router.get("/agents",  getAgents);


export default router;