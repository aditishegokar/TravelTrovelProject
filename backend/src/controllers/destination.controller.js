const DestinationGuide = require("../models/DestinationGuide");

// SEARCH DESTINATION GUIDES
exports.searchGuides = async (req, res, next) => {
    try {
        const { query } = req.query;

        if (!query || query.trim() === "") {
            return res.status(400).json({ error: "Invalid search query" });
        }

        const guides = await DestinationGuide.find({
            title: { $regex: query, $options: "i" },
        }).select("title summary photos");

        res.status(200).json({
            destinationGuides: guides,
        });
    } catch (error) {
        next(error);
    }
};

// VIEW DESTINATION GUIDE BY ID
exports.getGuideById = async (req, res, next) => {
    try {
        const guide = await DestinationGuide.findById(req.params.id).populate(
            "reviews.user",
            "email"
        );

        if (!guide) {
            return res
                .status(404)
                .json({ error: "Destination guide not found" });
        }

        res.status(200).json(guide);
    } catch (error) {
        next(error);
    }
};
