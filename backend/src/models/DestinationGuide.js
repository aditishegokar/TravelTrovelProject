const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        comment: String,
    },
    { timestamps: true }
);

const destinationGuideSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            index: true,
        },
        summary: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        photos: [String],

        history: String,
        culture: String,
        attractions: [String],

        recommendations: {
            lodging: [String],
            dining: [String],
            activities: [String],
        },

        reviews: [reviewSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("DestinationGuide", destinationGuideSchema);
