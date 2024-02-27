import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
    }
},
    {
        timestamps: true,
    });

const User = mongoose.model("User", userSchema);
export default User;