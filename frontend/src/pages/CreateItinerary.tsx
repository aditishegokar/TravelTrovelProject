// import { useState } from "react";
// import { createItinerary } from "../api/itinerary.api";
// import Layout from "../components/common/Layout";
// import { useNavigate } from "react-router-dom";

// const CreateItinerary = () => {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         destination: "",
//         duration: "",
//         activities: "",
//         lodging: "",
//         dining: "",
//     });

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             await createItinerary({
//                 destination: form.destination,
//                 duration: form.duration,
//                 activities: form.activities
//                     .split(",")
//                     .map((a) => a.trim())
//                     .filter(Boolean),
//                 lodging: form.lodging,
//                 dining: form.dining,
//             });

//             navigate("/my-itineraries");
//         } catch (err: any) {
//             setError(err.response?.data?.error || "Failed to create itinerary");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Layout>
//             <div className="min-h-screen bg-white">
//                 <div className="max-w-2xl mx-auto px-4 py-12">
//                     {/* Back Button */}
//                     <button
//                         onClick={() => navigate("/my-itineraries")}
//                         className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
//                     >
//                         <svg
//                             className="w-5 h-5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M15 19l-7-7 7-7"
//                             />
//                         </svg>
//                         <span className="text-sm font-medium">Back to Itineraries</span>
//                     </button>

//                     {/* Header */}
//                     <div className="mb-8">
//                         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                             Create New Itinerary
//                         </h1>
//                         <p className="text-gray-600">
//                             Plan your next adventure with detailed travel plans
//                         </p>
//                     </div>

//                     {/* Form Card */}
//                     <div className="bg-white border border-gray-200 rounded-lg p-8">
//                         {/* Error Message */}
//                         {error && (
//                             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//                                 <svg
//                                     className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                     />
//                                 </svg>
//                                 <p className="text-sm text-red-800">{error}</p>
//                             </div>
//                         )}

//                         {/* Form */}
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {/* Destination */}
//                             <div>
//                                 <label
//                                     htmlFor="destination"
//                                     className="block text-sm font-medium text-gray-700 mb-2"
//                                 >
//                                     Destination <span className="text-red-500">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg
//                                             className="w-5 h-5 text-gray-400"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             viewBox="0 0 24 24"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                                             />
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                                             />
//                                         </svg>
//                                     </div>
//                                     <input
//                                         id="destination"
//                                         name="destination"
//                                         type="text"
//                                         placeholder="e.g., Bali, Indonesia"
//                                         value={form.destination}
//                                         onChange={handleChange}
//                                         required
//                                         className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Duration */}
//                             <div>
//                                 <label
//                                     htmlFor="duration"
//                                     className="block text-sm font-medium text-gray-700 mb-2"
//                                 >
//                                     Duration <span className="text-red-500">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg
//                                             className="w-5 h-5 text-gray-400"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             viewBox="0 0 24 24"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                                             />
//                                         </svg>
//                                     </div>
//                                     <input
//                                         id="duration"
//                                         name="duration"
//                                         type="text"
//                                         placeholder="e.g., 7 days"
//                                         value={form.duration}
//                                         onChange={handleChange}
//                                         required
//                                         className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Activities */}
//                             <div>
//                                 <label
//                                     htmlFor="activities"
//                                     className="block text-sm font-medium text-gray-700 mb-2"
//                                 >
//                                     Activities
//                                 </label>
//                                 <textarea
//                                     id="activities"
//                                     name="activities"
//                                     placeholder="Enter activities separated by commas (e.g., Beach surfing, Temple visits, Snorkeling)"
//                                     value={form.activities}
//                                     onChange={handleChange}
//                                     rows={4}
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all resize-none"
//                                 />
//                                 <p className="mt-2 text-xs text-gray-500">
//                                     Separate multiple activities with commas
//                                 </p>
//                             </div>

//                             {/* Lodging */}
//                             <div>
//                                 <label
//                                     htmlFor="lodging"
//                                     className="block text-sm font-medium text-gray-700 mb-2"
//                                 >
//                                     Lodging
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg
//                                             className="w-5 h-5 text-gray-400"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             viewBox="0 0 24 24"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                                             />
//                                         </svg>
//                                     </div>
//                                     <input
//                                         id="lodging"
//                                         name="lodging"
//                                         type="text"
//                                         placeholder="e.g., Beachfront Resort, Villa"
//                                         value={form.lodging}
//                                         onChange={handleChange}
//                                         className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Dining */}
//                             <div>
//                                 <label
//                                     htmlFor="dining"
//                                     className="block text-sm font-medium text-gray-700 mb-2"
//                                 >
//                                     Dining Preferences
//                                 </label>
//                                 <input
//                                     id="dining"
//                                     name="dining"
//                                     type="text"
//                                     placeholder="e.g., Local cuisine, seafood, vegetarian options"
//                                     value={form.dining}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
//                                 />
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="flex gap-3 pt-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => navigate("/my-itineraries")}
//                                     className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     {loading ? (
//                                         <span className="flex items-center justify-center gap-2">
//                                             <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                                             Creating...
//                                         </span>
//                                     ) : (
//                                         "Create Itinerary"
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default CreateItinerary;





// import { useState, useEffect } from "react";
// import { createItinerary } from "../api/itinerary.api";
// import Layout from "../components/common/Layout";
// import { useNavigate } from "react-router-dom";

// // ⭐ Background Image + Page Styling
// const pageStyle: React.CSSProperties = {
//   backgroundImage:
//     "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1650&q=80')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   minHeight: "100vh",
//   padding: "50px 0",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "flex-start",
// };

// // ⭐ Glass UI Card Styling
// const cardStyle: React.CSSProperties = {
//   background: "rgba(255, 255, 255, 0.35)",
//   backdropFilter: "blur(18px) saturate(180%)",
//   WebkitBackdropFilter: "blur(18px) saturate(180%)",
//   borderRadius: "22px",
//   padding: "35px 35px",
//   width: "100%",
//   maxWidth: "650px",
//   boxShadow: "0 12px 45px rgba(0,0,0,0.25)",
//   border: "1px solid rgba(255,255,255,0.45)",
//   transition: "0.35s ease",
// };

// // ⭐ Hover Animation
// const cardHover = {
//   transform: "scale(1.015)",
//   boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
// };

// // Recommendations Data
// const DESTINATION_RECOMMENDATIONS: Record<
//   string,
//   { activities: string[]; lodging: string[]; dining: string[] }
// > = {
//   Bali: {
//     activities: ["Beach surfing", "Temple visits", "Snorkeling", "Rice terrace tour"],
//     lodging: ["Beachfront Resort", "Private Villa", "Budget Hostel"],
//     dining: ["Seafood", "Local cuisine", "Vegan options"],
//   },
//   Goa: {
//     activities: ["Beach party", "Water sports", "Night market tour", "Sunset cruise"],
//     lodging: ["Beachside Cottage", "Luxury Resort", "Hostel"],
//     dining: ["Goan seafood", "Street food", "Vegetarian options"],
//   },
//   Rajasthan: {
//     activities: ["Fort visits", "Camel safari", "Cultural show", "Desert camping"],
//     lodging: ["Palace hotel", "Heritage haveli", "Resort"],
//     dining: ["Rajasthani thali", "Local sweets", "Street food"],
//   },
//   Kerala: {
//     activities: ["Backwater cruise", "Ayurvedic spa", "Tea plantation tour", "Wildlife safari"],
//     lodging: ["Houseboat", "Beach resort", "Homestay"],
//     dining: ["Kerala cuisine", "Seafood", "Vegetarian options"],
//   },
// };

// interface ItineraryData {
//   destination: string;
//   duration: string;
//   startDate: string;
//   endDate: string;
//   activities: string[];
//   lodging: string;
//   dining: string;
// }

// const CreateItinerary = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     destination: "",
//     duration: "",
//     startDate: "",
//     endDate: "",
//     activities: "",
//     lodging: "",
//     dining: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [recommendations, setRecommendations] = useState({
//     activities: [] as string[],
//     lodging: [] as string[],
//     dining: [] as string[],
//   });

//   useEffect(() => {
//     const dest = form.destination.trim();
//     if (dest && DESTINATION_RECOMMENDATIONS[dest]) {
//       setRecommendations(DESTINATION_RECOMMENDATIONS[dest]);
//     } else {
//       setRecommendations({ activities: [], lodging: [], dining: [] });
//     }
//   }, [form.destination]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;

//     setForm((prev) => {
//       let updated = { ...prev, [name]: value };

//       if ((name === "startDate" || name === "duration") && updated.startDate && updated.duration) {
//         const days = parseInt(updated.duration);
//         if (!isNaN(days) && days > 0) {
//           const start = new Date(updated.startDate);
//           start.setDate(start.getDate() + days);
//           updated.endDate = start.toISOString().split("T")[0];
//         }
//       }
//       return updated;
//     });
//   };

//   const handleRecommendationClick = (field: "activities" | "lodging" | "dining", value: string) => {
//     if (field === "activities") {
//       const activities = form.activities ? form.activities.split(",").map((a) => a.trim()) : [];
//       if (!activities.includes(value)) activities.push(value);
//       setForm({ ...form, activities: activities.join(", ") });
//     } else {
//       setForm({ ...form, [field]: value });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!form.startDate || !form.endDate) {
//       setError("Please select both start and end dates.");
//       setLoading(false);
//       return;
//     }
//     if (new Date(form.startDate) < new Date()) {
//       setError("Start date must be in the future.");
//       setLoading(false);
//       return;
//     }
//     if (new Date(form.endDate) <= new Date(form.startDate)) {
//       setError("End date must be after the start date.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const data: ItineraryData = {
//         destination: form.destination,
//         duration: form.duration,
//         startDate: form.startDate,
//         endDate: form.endDate,
//         activities: form.activities.split(",").map((a) => a.trim()).filter(Boolean),
//         lodging: form.lodging,
//         dining: form.dining,
//       };

//       await createItinerary(data);
//       navigate("/my-itineraries");
//     } catch (err: any) {
//       setError(err.response?.data?.error || "Failed to create itinerary. Check destination.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div style={pageStyle}>
//         <div
//           style={cardStyle}
//           onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
//           onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
//         >
//           <button
//             onClick={() => navigate("/my-itineraries")}
//             className="text-gray-700 hover:text-black mb-4 font-medium"
//           >
//             ← Back to Itineraries
//           </button>

//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Create New Itinerary</h1>

//           {error && (
//             <div className="mb-4 bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <input
//               type="text"
//               name="destination"
//               placeholder="Destination (Bali, Goa, Rajasthan)"
//               className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-black/40"
//               value={form.destination}
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="number"
//               name="duration"
//               placeholder="Duration (days)"
//               className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-black/40"
//               value={form.duration}
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="date"
//               name="startDate"
//               className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-black/40"
//               value={form.startDate}
//               onChange={handleChange}
//               required
//               min={new Date().toISOString().split("T")[0]}
//             />

//             <input
//               type="date"
//               name="endDate"
//               readOnly
//               className="w-full px-4 py-3 rounded-lg border bg-gray-200/60"
//               value={form.endDate}
//             />

//             <textarea
//               name="activities"
//               rows={3}
//               placeholder="Activities (comma separated)"
//               className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur resize-none focus:ring-2 focus:ring-black/40"
//               value={form.activities}
//               onChange={handleChange}
//             ></textarea>

//             {/* Quick pick suggestions */}
//             {recommendations.activities.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {recommendations.activities.map((a) => (
//                   <button
//                     type="button"
//                     key={a}
//                     onClick={() => handleRecommendationClick("activities", a)}
//                     className="px-3 py-1 text-sm bg-black/70 text-white rounded-full hover:bg-black"
//                   >
//                     {a}
//                   </button>
//                 ))}
//               </div>
//             )}

//             <input
//               type="text"
//               name="lodging"
//               placeholder="Lodging (Resort, Villa, Hostel)"
//               className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-black/40"
//               value={form.lodging}
//               onChange={handleChange}
//             />

//             {recommendations.lodging.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {recommendations.lodging.map((l) => (
//                   <button
//                     type="button"
//                     key={l}
//                     onClick={() => handleRecommendationClick("lodging", l)}
//                     className="px-3 py-1 text-sm bg-black/70 text-white rounded-full hover:bg-black"
//                   >
//                     {l}
//                   </button>
//                 ))}
//               </div>
//             )}

//             <input
//               type="text"
//               name="dining"
//               placeholder="Dining Preference (Seafood, Veg, Local)"
//               className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-black/40"
//               value={form.dining}
//               onChange={handleChange}
//             />

//             {recommendations.dining.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {recommendations.dining.map((d) => (
//                   <button
//                     type="button"
//                     key={d}
//                     onClick={() => handleRecommendationClick("dining", d)}
//                     className="px-3 py-1 text-sm bg-black/70 text-white rounded-full hover:bg-black"
//                   >
//                     {d}
//                   </button>
//                 ))}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50"
//             >
//               {loading ? "Creating..." : "Create Itinerary"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CreateItinerary;


import { useState, useEffect } from "react";
import { createItinerary } from "../api/itinerary.api";
import Layout from "../components/common/Layout";
import { useNavigate } from "react-router-dom";
import CreateItineraryBg from "../assets/CreateItinerary.avif"; // ✅ Local background image

// ⭐ Background Image + Page Styling
const pageStyle: React.CSSProperties = {
  backgroundImage: `url(${CreateItineraryBg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
  padding: "50px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
};

// ⭐ Glass UI Card Styling
const cardStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.35)",
  backdropFilter: "blur(18px) saturate(180%)",
  WebkitBackdropFilter: "blur(18px) saturate(180%)",
  borderRadius: "22px",
  padding: "35px 35px",
  width: "100%",
  maxWidth: "650px",
  boxShadow: "0 12px 45px rgba(0,0,0,0.25)",
  border: "1px solid rgba(255,255,255,0.45)",
  transition: "0.35s ease",
};

// ⭐ Hover Animation
const cardHover = {
  transform: "scale(1.015)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
};

// Recommendations Data
const DESTINATION_RECOMMENDATIONS: Record<
  string,
  { activities: string[]; lodging: string[]; dining: string[] }
> = {
  Bali: {
    activities: ["Beach surfing", "Temple visits", "Snorkeling", "Rice terrace tour"],
    lodging: ["Beachfront Resort", "Private Villa", "Budget Hostel"],
    dining: ["Seafood", "Local cuisine", "Vegan options"],
  },
  Goa: {
    activities: ["Beach party", "Water sports", "Night market tour", "Sunset cruise"],
    lodging: ["Beachside Cottage", "Luxury Resort", "Hostel"],
    dining: ["Goan seafood", "Street food", "Vegetarian options"],
  },
  Rajasthan: {
    activities: ["Fort visits", "Camel safari", "Cultural show", "Desert camping"],
    lodging: ["Palace hotel", "Heritage haveli", "Resort"],
    dining: ["Rajasthani thali", "Local sweets", "Street food"],
  },
  Kerala: {
    activities: ["Backwater cruise", "Ayurvedic spa", "Tea plantation tour", "Wildlife safari"],
    lodging: ["Houseboat", "Beach resort", "Homestay"],
    dining: ["Kerala cuisine", "Seafood", "Vegetarian options"],
  },
};

interface ItineraryData {
  destination: string;
  duration: string;
  startDate: string;
  endDate: string;
  activities: string[];
  lodging: string;
  dining: string;
}

const CreateItinerary = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    destination: "",
    duration: "",
    startDate: "",
    endDate: "",
    activities: "",
    lodging: "",
    dining: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState({
    activities: [] as string[],
    lodging: [] as string[],
    dining: [] as string[],
  });

  // ⭐ Case-insensitive destination matching for recommendations
  useEffect(() => {
    const dest = form.destination.trim().toLowerCase();
    const match = Object.keys(DESTINATION_RECOMMENDATIONS).find(
      (key) => key.toLowerCase() === dest
    );

    if (match) {
      setRecommendations(DESTINATION_RECOMMENDATIONS[match]);
    } else {
      setRecommendations({ activities: [], lodging: [], dining: [] });
    }
  }, [form.destination]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prev) => {
      let updated = { ...prev, [name]: value };

      // ⭐ Auto calculate endDate based on startDate + duration
      if ((name === "startDate" || name === "duration") && updated.startDate && updated.duration) {
        const days = parseInt(updated.duration);
        if (!isNaN(days) && days > 0) {
          const start = new Date(updated.startDate);
          start.setDate(start.getDate() + days);
          updated.endDate = start.toISOString().split("T")[0];
        }
      }
      return updated;
    });
  };

  // ⭐ Handle recommendation clicks
  const handleRecommendationClick = (field: "activities" | "lodging" | "dining", value: string) => {
    setForm((prev) => {
      if (field === "activities") {
        const activities = prev.activities
          ? prev.activities.split(",").map((a) => a.trim()).filter(Boolean)
          : [];
        if (!activities.includes(value)) activities.push(value);
        return { ...prev, activities: activities.join(", ") };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.startDate || !form.endDate) {
      setError("Please select both start and end dates.");
      setLoading(false);
      return;
    }
    if (new Date(form.startDate) < new Date()) {
      setError("Start date must be in the future.");
      setLoading(false);
      return;
    }
    if (new Date(form.endDate) <= new Date(form.startDate)) {
      setError("End date must be after the start date.");
      setLoading(false);
      return;
    }

    try {
      const data: ItineraryData = {
        destination: form.destination,
        duration: form.duration,
        startDate: form.startDate,
        endDate: form.endDate,
        activities: form.activities.split(",").map((a) => a.trim()).filter(Boolean),
        lodging: form.lodging,
        dining: form.dining,
      };

      await createItinerary(data);
      navigate("/my-itineraries");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create itinerary. Check destination.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={pageStyle}>
        <div
          style={cardStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
        >
          <button
            onClick={() => navigate("/my-itineraries")}
            className="text-gray-700 hover:text-black mb-4 font-medium"
          >
            ← Back to Itineraries
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create New Itinerary</h1>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="destination"
              placeholder="Destination (Bali, Goa, Rajasthan, Kerala)"
              className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-black/40"
              value={form.destination}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="duration"
              placeholder="Duration (days)"
              className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-black/40"
              value={form.duration}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="startDate"
              className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-black/40"
              value={form.startDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
            />

            <input
              type="date"
              name="endDate"
              readOnly
              className="w-full px-4 py-3 rounded-lg border bg-gray-200/60"
              value={form.endDate}
            />

            <textarea
              name="activities"
              rows={3}
              placeholder="Activities (comma separated)"
              className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur resize-none focus:ring-2 focus:ring-black/40"
              value={form.activities}
              onChange={handleChange}
            ></textarea>

            {/* Quick pick suggestions */}
            {recommendations.activities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recommendations.activities.map((a) => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => handleRecommendationClick("activities", a)}
                    className="px-3 py-1 text-sm bg-black/70 text-white rounded-full hover:bg-black"
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}

            <input
              type="text"
              name="lodging"
              placeholder="Lodging (Resort, Villa, Hostel)"
              className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-black/40"
              value={form.lodging}
              onChange={handleChange}
            />

            {recommendations.lodging.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recommendations.lodging.map((l) => (
                  <button
                    type="button"
                    key={l}
                    onClick={() => handleRecommendationClick("lodging", l)}
                    className="px-3 py-1 text-sm bg-black/70 text-white rounded-full hover:bg-black"
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}

            <input
              type="text"
              name="dining"
              placeholder="Dining Preference (Seafood, Veg, Local)"
              className="w-full px-4 py-3 rounded-lg border bg-white/60 backdrop-blur focus:ring-2 focus:ring-black/40"
              value={form.dining}
              onChange={handleChange}
            />

            {recommendations.dining.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {recommendations.dining.map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => handleRecommendationClick("dining", d)}
                    className="px-3 py-1 text-sm bg-black/70 text-white rounded-full hover:bg-black"
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Itinerary"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateItinerary;
