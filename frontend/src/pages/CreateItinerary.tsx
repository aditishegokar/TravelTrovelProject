import { useState } from "react";
import { createItinerary } from "../api/itinerary.api";
import Layout from "../components/common/Layout";
import { useNavigate } from "react-router-dom";

const CreateItinerary = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        destination: "",
        duration: "",
        activities: "",
        lodging: "",
        dining: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await createItinerary({
                destination: form.destination,
                duration: form.duration,
                activities: form.activities
                    .split(",")
                    .map((a) => a.trim())
                    .filter(Boolean),
                lodging: form.lodging,
                dining: form.dining,
            });

            navigate("/my-itineraries");
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to create itinerary");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                <div className="max-w-2xl mx-auto px-4 py-12">
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

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Create New Itinerary
                        </h1>
                        <p className="text-gray-600">
                            Plan your next adventure with detailed travel plans
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Destination */}
                            <div>
                                <label
                                    htmlFor="destination"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Destination <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
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
                                    <input
                                        id="destination"
                                        name="destination"
                                        type="text"
                                        placeholder="e.g., Bali, Indonesia"
                                        value={form.destination}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Duration */}
                            <div>
                                <label
                                    htmlFor="duration"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Duration <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
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
                                    </div>
                                    <input
                                        id="duration"
                                        name="duration"
                                        type="text"
                                        placeholder="e.g., 7 days"
                                        value={form.duration}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Activities */}
                            <div>
                                <label
                                    htmlFor="activities"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Activities
                                </label>
                                <textarea
                                    id="activities"
                                    name="activities"
                                    placeholder="Enter activities separated by commas (e.g., Beach surfing, Temple visits, Snorkeling)"
                                    value={form.activities}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all resize-none"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    Separate multiple activities with commas
                                </p>
                            </div>

                            {/* Lodging */}
                            <div>
                                <label
                                    htmlFor="lodging"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Lodging
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
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
                                    <input
                                        id="lodging"
                                        name="lodging"
                                        type="text"
                                        placeholder="e.g., Beachfront Resort, Villa"
                                        value={form.lodging}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Dining */}
                            <div>
                                <label
                                    htmlFor="dining"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Dining Preferences
                                </label>
                                <input
                                    id="dining"
                                    name="dining"
                                    type="text"
                                    placeholder="e.g., Local cuisine, seafood, vegetarian options"
                                    value={form.dining}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate("/my-itineraries")}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Creating...
                                        </span>
                                    ) : (
                                        "Create Itinerary"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateItinerary;
