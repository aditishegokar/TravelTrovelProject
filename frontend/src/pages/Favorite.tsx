// import { useEffect, useState } from "react";
// import Layout from "../components/common/Layout";
// import { getFavorites, removeFavorite } from "../api/favorite.api";
// import { FavoriteItem } from "../types/favorite";
// import { useNavigate } from "react-router-dom";

// const Favorites = () => {
//     const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
//     const navigate = useNavigate();

//     const load = async () => {
//         const res = await getFavorites();
//         setFavorites(res.data.favorites);
//     };

//     const handleRemove = async (favId: string) => {
//         await removeFavorite(favId);
//         load();
//     };

//     useEffect(() => {
//         load();
//     }, []);

//     return (
//         <Layout>
//             <div className="min-h-screen bg-gray-50 px-6 py-10">
//                 <div className="max-w-4xl mx-auto">
//                     <h2 className="text-2xl font-semibold mb-6">My Favorites</h2>

//                     {favorites.length === 0 && (
//                         <p className="text-gray-500 text-center">
//                             No favorites added yet.
//                         </p>
//                     )}

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {favorites.map((fav) => (
//                             <div
//                                 key={fav._id}
//                                 className="bg-white rounded-lg shadow p-5 flex justify-between items-center"
//                             >
//                                 <div>
//                                     <p className="text-sm text-gray-500">
//                                         {fav.type === "destination-guide"
//                                             ? "Destination Guide"
//                                             : "Trip Itinerary"}
//                                     </p>

//                                     <p className="font-medium text-gray-800">
//                                         {fav.type === "destination-guide"
//                                             ? fav.destinationGuide?.title
//                                             : fav.tripItinerary?.destination}
//                                     </p>
//                                 </div>

//                                 <div className="flex gap-3">
//                                     <button
//                                         onClick={() =>
//                                             navigate(
//                                                 fav.type === "destination-guide"
//                                                     ? `/destinations/${fav.destinationGuide?._id}`
//                                                     : `/itinerary/${fav.tripItinerary?._id}`
//                                             )
//                                         }
//                                         className="text-blue-600 hover:underline"
//                                     >
//                                         View
//                                     </button>


//                                     <button
//                                         onClick={() => handleRemove(fav._id)}
//                                         className="text-red-600 hover:underline"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default Favorites;

import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getFavorites, removeFavorite } from "../api/favorite.api";
import { FavoriteItem } from "../types/favorite";
import { useNavigate } from "react-router-dom";
import FavoriteImg from "../assets/Favorite.jpg"; // Local JPG

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const navigate = useNavigate();

  const load = async () => {
    const res = await getFavorites();
    setFavorites(res.data.favorites);
  };

  const handleRemove = async (favId: string) => {
    await removeFavorite(favId);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout>
      {/* Background with dark overlay */}
      <div
        className="min-h-screen py-14 px-6 bg-center bg-cover relative"
        style={{
          backgroundImage: `url(${FavoriteImg})`, // Local JPG
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10">
          <h2
            className="text-4xl font-bold text-white text-center mb-12"
            style={{
              textShadow: "2px 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            My Favorites
          </h2>

          {favorites.length === 0 && (
            <p className="text-center text-gray-200">
              No favorites added yet.
            </p>
          )}

          {/* 3 cards per row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {favorites.map((fav) => (
              <div
                key={fav._id}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12))",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  borderRadius: "22px",
                  padding: "1.75rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.35)",
                  boxShadow: "0 15px 45px rgba(0,0,0,0.45)",
                  color: "#fff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 22px 60px rgba(0,0,0,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 45px rgba(0,0,0,0.45)";
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      opacity: 0.95,
                      textShadow: "1px 1px 6px rgba(0,0,0,0.8)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {fav.type === "destination-guide"
                      ? "Destination Guide"
                      : "Trip Itinerary"}
                  </p>

                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      textShadow: "1px 1px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {fav.type === "destination-guide"
                      ? fav.destinationGuide?.title
                      : fav.tripItinerary?.destination}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={() =>
                      navigate(
                        fav.type === "destination-guide"
                          ? `/guide/${fav.destinationGuide?._id}`
                          : `/itinerary/${fav.tripItinerary?._id}`
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-black/50 hover:bg-black/70 transition text-white"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleRemove(fav._id)}
                    className="px-4 py-2 rounded-lg bg-red-600/50 hover:bg-red-600/70 transition text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;

