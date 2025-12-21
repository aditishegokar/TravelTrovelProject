const TripItinerary = require("../models/TripItinerary");

// CREATE TRIP ITINERARY
exports.createItinerary = async (req, res, next) => {
    try {
        const { destination, duration, activities, lodging, dining } = req.body;

        if (!destination || !duration) {
            return res.status(400).json({ error: "Invalid request body" });
        }

        const itinerary = await TripItinerary.create({
            user: req.user._id,
            destination,
            duration,
            activities,
            lodging,
            dining,
        });

        res.status(201).json({
            message: "Trip itinerary created successfully",
            id: itinerary._id,
        });
    } catch (error) {
        next(error);
    }
};

// VIEW TRIP ITINERARY
exports.getItineraryById = async (req, res, next) => {
    try {
        const itinerary = await TripItinerary.findById(req.params.id).populate(
            "user",
            "email"
        );

        if (!itinerary) {
            return res.status(404).json({ error: "Trip itinerary not found" });
        }

        res.status(200).json(itinerary);
    } catch (error) {
        next(error);
    }
};
