import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
    },
    finish_at: Date,
    start_at: Date,
},
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;