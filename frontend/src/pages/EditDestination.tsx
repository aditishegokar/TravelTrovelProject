import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import { getDestinationById, updateDestination } from "../api/destination.api";
import { DestinationGuide } from "../types/destination";

const EditDestination = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState("");
    const [history, setHistory] = useState("");
    const [culture, setCulture] = useState("");
    const [attractions, setAttractions] = useState("");
    const [lodging, setLodging] = useState("");
    const [dining, setDining] = useState("");
    const [activities, setActivities] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        const fetchDestination = async () => {
            try {
                const res = await getDestinationById(id);
                const dest = res.data;
                setTitle(dest.title);
                setSummary(dest.summary);
                setDescription(dest.description);
                setHistory(dest.history || "");
                setCulture(dest.culture || "");
                setPhotos(dest.photos?.join(", ") || "");
                setAttractions(dest.attractions?.join(", ") || "");
                if (dest.recommendations) {
                    setLodging(dest.recommendations.lodging?.join(", ") || "");
                    setDining(dest.recommendations.dining?.join(", ") || "");
                    setActivities(dest.recommendations.activities?.join(", ") || "");
                }
            } catch (err) {
                setError("Failed to fetch destination data.");
            }
        };
        fetchDestination();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        setLoading(true);
        setError("");

        try {
            const destinationData: Partial<DestinationGuide> = {
                title,
                summary,
                description,
                photos: photos.split(',').map(s => s.trim()).filter(Boolean),
                history,
                culture,
                attractions: attractions.split(',').map(s => s.trim()).filter(Boolean),
                recommendations: {
                    lodging: lodging.split(',').map(s => s.trim()).filter(Boolean),
                    dining: dining.split(',').map(s => s.trim()).filter(Boolean),
                    activities: activities.split(',').map(s => s.trim()).filter(Boolean),
                }
            };
            await updateDestination(id, destinationData);
            navigate(`/destinations/${id}`);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to update destination");
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Edit Destination</h1>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                                Summary
                            </label>
                            <textarea
                                id="summary"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                required
                                rows={3}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows={6}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-2">
                                Photos (comma-separated URLs)
                            </label>
                            <input
                                id="photos"
                                type="text"
                                value={photos}
                                onChange={(e) => setPhotos(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="history" className="block text-sm font-medium text-gray-700 mb-2">
                                History
                            </label>
                            <textarea
                                id="history"
                                value={history}
                                onChange={(e) => setHistory(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="culture" className="block text-sm font-medium text-gray-700 mb-2">
                                Culture
                            </label>
                            <textarea
                                id="culture"
                                value={culture}
                                onChange={(e) => setCulture(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="attractions" className="block text-sm font-medium text-gray-700 mb-2">
                                Attractions (comma-separated)
                            </label>
                            <input
                                id="attractions"
                                type="text"
                                value={attractions}
                                onChange={(e) => setAttractions(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 pt-4 border-t">Recommendations</h3>
                        <div>
                            <label htmlFor="lodging" className="block text-sm font-medium text-gray-700 mb-2">
                                Lodging (comma-separated)
                            </label>
                            <input
                                id="lodging"
                                type="text"
                                value={lodging}
                                onChange={(e) => setLodging(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="dining" className="block text-sm font-medium text-gray-700 mb-2">
                                Dining (comma-separated)
                            </label>
                            <input
                                id="dining"
                                type="text"
                                value={dining}
                                onChange={(e) => setDining(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="activities" className="block text-sm font-medium text-gray-700 mb-2">
                                Activities (comma-separated)
                            </label>
                            <input
                                id="activities"
                                type="text"
                                value={activities}
                                onChange={(e) => setActivities(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update Destination"}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default EditDestination;
