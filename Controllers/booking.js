import bookingModel from '../Models/booking.js';
import userModel from '../Models/user.js';
import bookingSchema from '../Schemas/booking.js';

/**
 * @description This function is used to Create a booking for a user which belongs to the current agent
 * @route POST  /booking
 * @access Private (Admin)
 */

export const createBooking = async (req, res) => {
    try {
        const { error } = bookingSchema(req.body);
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message,
            });
        }
        const { userId, start_at, finish_at } = req.body;
        const agentId = req.agent;

        // Verify date range
        const startDate = new Date(start_at);
        const endDate = new Date(finish_at);
        if (startDate >= endDate) {
            return res.status(400).send({ message: "Invalid date range" });
        }

        // Verify user-agent relationship
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        if (!user.agent.equals(agentId)) {
            return res.status(403).send({ message: "User does not belong to the agent" });
        }

        const booking = new bookingModel({
            user: user,
            agent: agentId,
            start_at: startDate,
            finish_at: endDate,
        });

        await booking.save();
        res.status(201).json({
            status: "success",
            message: "Booking created successfully",
        });
    } catch (error) {
        console.error("Failed to validate booking data", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to validate booking data",
        });
    }
}

/**
 * @description This function will delete a booking
 * @param id - The booking id
 * @route DELETE /booking/:id
 * @access Private (Admin)
 */

export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const agentId = req.agent;

        const booking = await bookingModel.findById(id);
        if (!booking) {
            return res.status(404).json({
                status: "error",
                message: "Booking not found"
            });
        }
        if (!booking.agent.equals(agentId)) {
            return res.status(403).json({
                status: "error",
                message: "You are not authorized to perform this action"
            });
        }

        await booking.delete();
        res.status(200).json({
            status: "success",
            message: "Booking deleted successfully"
        });
    } catch (error) {
        console.error("Failed to delete booking", error);
        res.status(500).json({
            status: "error",
            message: "Failed to delete booking"
        });
    }
}

