const DestinationGuide = require("../models/DestinationGuide");

// GET DESTINATION GUIDES (TRENDING OR SEARCH)
exports.getGuides = async (req, res, next) => {
    try {
        const { query } = req.query;

        let guides;

        if (query && query.trim() !== "") {
            // If there's a search query, find matching guides
            guides = await DestinationGuide.find({
                title: { $regex: query, $options: "i" },
            }).select("title summary photos");
        } else {
            // If there's no search query, get trending guides (most reviewed)
            guides = await DestinationGuide.aggregate([
                {
                    $addFields: {
                        reviewCount: { $size: "$reviews" },
                    },
                },
                {
                    $sort: {
                        reviewCount: -1,
                    },
                },
                {
                    $limit: 10,
                },
                {
                    $project: {
                        title: 1,
                        summary: 1,
                        photos: 1,
                    },
                },
            ]);
        }

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
