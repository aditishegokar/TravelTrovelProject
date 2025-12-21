db.destinationguides.insertMany([
    {
        title: "Bali Destination Guide",
        summary: "Explore the beauty of Bali with our comprehensive guide.",
        description:
            "Detailed information about Bali including history, culture, attractions, and recommendations.",
        photos: ["photo_url1", "photo_url2"],
        history: "Bali has a rich cultural history...",
        culture: "Balinese culture is deeply spiritual...",
        attractions: ["Ubud", "Kuta Beach", "Tanah Lot"],
        recommendations: {
            lodging: ["Luxury Villas", "Beach Resorts"],
            dining: ["Local Cuisine", "Seafood"],
            activities: ["Surfing", "Snorkeling"],
        },
        reviews: [],
    },
    {
        title: "Paris Destination Guide",
        summary: "Discover the magic of Paris, the City of Lights.",
        description: "Paris is known for art, fashion, and culture.",
        photos: ["photo_url3", "photo_url4"],
        attractions: ["Eiffel Tower", "Louvre"],
        recommendations: {
            lodging: ["Boutique Hotels"],
            dining: ["French Cuisine"],
            activities: ["Sightseeing"],
        },
        reviews: [],
    },
]);
