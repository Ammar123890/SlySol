import agentModel from "../Models/agent.js";
import agentSchema from "../Schemas/agent.js";

/**
 * @description This function is get all agents
 * @route GET /agents
 * @access Private (Admin)
 */

export const getAgents = async (req, res) => {
  try {
    const agents = await agentModel.find();
    res.status(200).json({
      agents: agents,
      message: "Agents retrieved successfully",
    });
  } catch (error) {
    console.error("Failed to get agents", error);
    res.status(500).send("Error retrieving agents");
  }
}

/**
 * @description This function to create a new agent
 * @route POST /agents
 * @access Public  (for testing purposes)
 */

export const createAgent = async (req, res) => {
  try {
    const { error } = agentSchema(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }
    const { name, email, role } = req.body;
    const agent = new agentModel({
      name,
      email,
      role,
    });
    await agent.save();
    res.status(201).json({
      status: "success",
      message: "Agent created successfully",
    });
  } catch (error) {
    console.error("Failed to create agent", error);
    res.status(500).send("Error creating agent");
  }
}


