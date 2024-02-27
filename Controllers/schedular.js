import bookingModel from '../Models/booking.js';

/**
 * @description This function is used to get all booking and user data for a specific week
 * @param week - The week to get the booking data for
 * @route GET clientAPI/scheduler?week=weekdate
 */


export const getBookingData = async (req, res) => {
    try {
        const { week } = req.query;
        const startDate = new Date(week);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7); // Get the end date of the week

        // Query to find bookings within the week
        const bookings = await bookingModel.find({
            start_at: { $gte: startDate },
            finish_at: { $lt: endDate }
        })
            .populate('user')
            .populate('agent');

        res.status(200).json({
            booking: bookings,
            message: "Booking data retrieved successfully"
        });

    } catch (error) {
        console.error("Failed to get booking data", error);
        res.status(500).send("Error retrieving booking data");
    }
};

/**
 *@description Pending right now
 *@param week - The week to get the booking data for
 *@route GET businessAPI/scheduler?week=weekdate
*/

export const getBusinessBookingData = async (req, res) => {
    res.status(200).json({
        message: "Booking data retrieved successfully"
    });
}

