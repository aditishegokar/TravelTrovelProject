import { useState, useEffect } from "react";
import { getDestinations } from "../api/destination.api";
import { DestinationGuide } from "../types/destination";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";

export const Destinations = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<DestinationGuide[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            const res = await getDestinations();
            setResults(res.data.destinationGuides);
            setLoading(false);
        };
        fetchTrending();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        const res = await getDestinations(query);
        setResults(res.data.destinationGuides);
        setLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Layout>
            <div className=" min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* <div> */}
                <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Explore Destinations
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover amazing places around the world and plan your next adventure
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto mb-12">
                        <div className="flex gap-3 shadow-lg rounded-full overflow-hidden bg-white p-2">
                            <input
                                type="text"
                                placeholder="Search for destinations..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-1 px-6 py-3 outline-none text-gray-700 placeholder-gray-400"
                            />
                            <button
                                onClick={handleSearch}
                                disabled={loading}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl"
                            >
                                {loading ? "Searching..." : "Search"}
                            </button>
                        </div>
                    </div>

                    {/* Results Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((d) => (
                                <div
                                    key={d._id}
                                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                                    onClick={() => navigate(`/destinations/${d._id}`)}
                                >
                                    {/* Card Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                            {d.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                            {d.summary}
                                        </p>
                                        <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all duration-300">
                                            <span>View Details</span>
                                            <svg
                                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && results.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-gray-400 mb-4">
                                <svg
                                    className="w-24 h-24 mx-auto"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                                No destinations found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your search query
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};
