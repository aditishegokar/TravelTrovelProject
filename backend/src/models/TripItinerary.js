const mongoose = require("mongoose");

const tripItinerarySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        destination: {
            type: String,
            required: true,
            trim: true,
        },
        duration: {
            type: String,
            required: true,
        },
        activities: {
            type: [String],
            default: [],
        },
        lodging: {
            type: String,
        },
        dining: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TripItinerary", tripItinerarySchema);
