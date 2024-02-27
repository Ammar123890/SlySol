import agentModel from "../Models/agent.js";

export const adminAgentMiddleware = async (req, res, next) => {
    //get the admin id from the request header and check if the user is an admin
    const adminId = req.headers["X-Agent-Id"];
    const agent = await agentModel.findById(adminId);
    if (!agent) {
        return res.status(403).json({
            status: "error",
            message: "You are not authorized to perform this action",
        });
    }
    if (agent.role !== "admin") {
        return res.status(403).json({
            status: "error",
            message: "You are not authorized to perform this action",
        });
    }
    req.agent = adminId;
    next();
}

export const agentMiddleware = async (req, res, next) => {
    //get the agent id from the request header and check if the user is an agent
    const agentId = req.headers["X-Agent-Id"];
    const agent = await agentModel.findById(agentId);
    if (!agent) {
        return res.status(403).json({
            status: "error",
            message: "You are not authorized to perform this action",
        });
    }
    req.agent = agentId;
    next();
}

