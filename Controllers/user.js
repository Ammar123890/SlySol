import userModel from "../Models/user.js";
import agentModel from "../Models/agent.js";
import userSchema from "../Schemas/user.js";

/**
 * @description This function is used to get all users for that Agent
 * @route GET /users
 * @access Private (Admin, Regular)
 */

export const getUsers = async (req, res) => {
  try {
    const agentId = req.agent;
    const users = await userModel.find({ agent: agentId });
    res.status(200).json({
      users: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    console.error("Failed to get users", error);
    res.status(500).send("Error retrieving users");
  }
}

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
 * @description This function to create a new user
 * @route POST /users
 * @access Private (Admin, Regular)
 */

export const createUser = async (req, res) => {
  try {
    const { error } = userSchema(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }
    const { name, email, role } = req.body;
    const agentId = req.agent;
    const agent = await agentModel.findById(agentId);
    if (!agent) {
      return res.status(404).send({ message: "Agent not found" });
    }
    const user = new userModel({
      name,
      email,
      role,
      agent: agent,
    });
    await user.save();
    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Failed to create user", error);
    res.status(500).send("Error creating user");
  }
}
