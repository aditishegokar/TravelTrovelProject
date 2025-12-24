const DestinationGuide = require("../models/DestinationGuide");
const Review = require("../models/Review");

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
                    $lookup: {
                        from: 'reviews', // The name of the reviews collection
                        localField: '_id',
                        foreignField: 'destinationGuide',
                        as: 'reviews'
                    }
                },
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
        const guide = await DestinationGuide.findById(req.params.id);

        if (!guide) {
            return res
                .status(404)
                .json({ error: "Destination guide not found" });
        }

        const reviews = await Review.find({ destinationGuide: req.params.id }).populate(
            "user",
            "email"
        );

        // Convert guide to a plain object to attach reviews
        const guideObject = guide.toObject();
        guideObject.reviews = reviews;

        res.status(200).json(guideObject);
    } catch (error) {
        next(error);
    }
};

// CREATE DESTINATION GUIDE (ADMIN ONLY)
exports.createGuide = async (req, res, next) => {
    try {
        const { title, summary, description, photos, history, culture, attractions, recommendations } = req.body;

        const newGuide = new DestinationGuide({
            title,
            summary,
            description,
            photos,
            history,
            culture,
            attractions,
            recommendations
        });

        const savedGuide = await newGuide.save();
        res.status(201).json(savedGuide);
    } catch (error) {
        next(error);
    }
};

// UPDATE DESTINATION GUIDE (ADMIN ONLY)
exports.updateGuide = async (req, res, next) => {
    try {
        const updatedGuide = await DestinationGuide.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedGuide) {
            return res.status(404).json({ error: "Destination guide not found" });
        }

        res.status(200).json(updatedGuide);
    } catch (error) {
        next(error);
    }
};
