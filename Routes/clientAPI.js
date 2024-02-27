import { Router } from "express";
const router = Router();

//Controllers
import { getBookingData } from "../Controllers/schedular.js";
import { createBooking, deleteBooking } from "../Controllers/booking.js";

//Middleware
import { agentMiddleware, adminAgentMiddleware } from "../Middlwares/agent.js";

//Routes
router.get("/scheduler", agentMiddleware, getBookingData);

router.use(adminAgentMiddleware)
router.post("/booking", createBooking);
router.delete("/booking/:id", deleteBooking);


export default router;