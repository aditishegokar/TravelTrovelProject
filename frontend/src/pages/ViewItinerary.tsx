import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import { getItineraryById } from "../api/itinerary.api";
import { addFavorite } from "../api/favorite.api";
import { TripItinerary } from "../types/itinerary";

const ViewItinerary = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);
    const [error, setError] = useState("");

    // ---------- SAVE ----------
    const handleFavorite = async () => {
        if (!itinerary?._id) return;

        try {
            await addFavorite("trip-itinerary", itinerary._id);
            setIsFavorited(true); // ❤️ THIS controls color
        } catch {
            alert("Already saved");
        }
    };

    // ---------- FETCH ----------
    useEffect(() => {
        if (!id) return;

        getItineraryById(id)
            .then((res) => setItinerary(res.data))
            .catch(() => setError("Itinerary not found"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="py-32 text-center">Loading...</div>
            </Layout>
        );
    }

    if (!itinerary || error) {
        return (
            <Layout>
                <div className="py-32 text-center">
                    <p>{error}</p>
                    <button onClick={() => navigate("/my-itineraries")}>
                        Back
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-12">

                {/* HEADER */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {itinerary.destination}
                        </h1>
                        <p className="text-gray-600">
                            {itinerary.duration}
                        </p>
                    </div>

                    {/* ❤️ SAVE BUTTON */}
                    <button
                        onClick={handleFavorite}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg"
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            stroke="black"
                            strokeWidth="2"
                            fill={isFavorited ? "red" : "white"} // ✅ GUARANTEED
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                     2 5.42 4.42 3 7.5 3
                                     c1.74 0 3.41.81 4.5 2.09
                                     C13.09 3.81 14.76 3 16.5 3
                                     19.58 3 22 5.42 22 8.5
                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>

                        <span>
                            {isFavorited ? "Saved" : "Save"}
                        </span>
                    </button>
                </div>

                {/* CONTENT */}
                {itinerary.activities?.length > 0 && (
                    <div className="mb-6">
                        <h2 className="font-semibold mb-2">Activities</h2>
                        <ul>
                            {itinerary.activities.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {itinerary.lodging && (
                    <div className="mb-6">
                        <h2 className="font-semibold">Lodging</h2>
                        <p>{itinerary.lodging}</p>
                    </div>
                )}

                {itinerary.dining && (
                    <div>
                        <h2 className="font-semibold">Dining</h2>
                        <p>{itinerary.dining}</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ViewItinerary;
