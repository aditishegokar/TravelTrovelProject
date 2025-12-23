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
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFavorite = async () => {
        if (!itinerary?._id) return;
        setFavoriteLoading(true);
        try {
            await addFavorite("trip-itinerary", itinerary._id);
            alert("Added to favorites");
        } catch {
            alert("Already added or failed");
        } finally {
            setFavoriteLoading(false);
        }
    };

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
                <div className="flex flex-col items-center justify-center py-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900"></div>
                    <p className="mt-4 text-gray-600">Loading itinerary...</p>
                </div>
            </Layout>
        );
    }

    if (!itinerary || error) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center py-32">
                    <svg
                        className="w-16 h-16 text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <p className="text-gray-600 font-medium">{error || "Itinerary not found"}</p>
                    <button
                        onClick={() => navigate("/my-itineraries")}
                        className="mt-4 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Back to My Itineraries
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                <div className="max-w-4xl mx-auto px-4 py-12">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/my-itineraries")}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        <span className="text-sm font-medium">Back to Itineraries</span>
                    </button>

                    {/* Header Section */}
                    <div className="mb-10">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-gray-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {itinerary.destination}
                                    </h1>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="font-medium">{itinerary.duration}</span>
                                    </div>
                                    {itinerary.user?.email && (
                                        <>
                                            <span className="text-gray-400">·</span>
                                            <div className="flex items-center gap-2">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                <span>Created by {itinerary.user.email}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Favorite Button */}
                            <button
                                onClick={handleFavorite}
                                disabled={favoriteLoading}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                <span className="text-sm font-medium">
                                    {favoriteLoading ? "Adding..." : "Save"}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-8">
                        {/* Activities */}
                        {itinerary.activities && itinerary.activities.length > 0 && (
                            <div className="pb-8 border-b border-gray-200">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-gray-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-900">
                                        Activities
                                    </h2>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {itinerary.activities.map((activity, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700 flex-1">{activity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Lodging */}
                        {itinerary.lodging && (
                            <div className="pb-8 border-b border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-gray-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-900">Lodging</h2>
                                </div>
                                <div className="pl-13">
                                    <p className="text-gray-700 leading-relaxed">
                                        {itinerary.lodging}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Dining */}
                        {itinerary.dining && (
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-gray-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-900">Dining</h2>
                                </div>
                                <div className="pl-13">
                                    <p className="text-gray-700 leading-relaxed">
                                        {itinerary.dining}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ViewItinerary;
