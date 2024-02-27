import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
},
    {
        timestamps: true,
    }
);

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;
