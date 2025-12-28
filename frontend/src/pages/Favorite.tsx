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

// Example images array
const cardImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519817650390-64a93db5111e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
];

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
      <div
        className="min-h-screen relative bg-gray-100 py-14 px-4"
      >
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">
          My Favorites
        </h2>

        {favorites.length === 0 && (
          <p className="text-center text-gray-500">
            No favorites added yet.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {favorites.map((fav, index) => {
            // Cycle through cardImages array
            const bgImage = cardImages[index % cardImages.length];

            return (
              <div
                key={fav._id}
                style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backdropFilter: "blur(6px)",
                  borderRadius: "18px",
                  padding: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 18px 50px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 12px 40px rgba(0, 0, 0, 0.25)";
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      marginBottom: "0.25rem",
                      textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
                    }}
                  >
                    {fav.type === "destination-guide"
                      ? "Destination Guide"
                      : "Trip Itinerary"}
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      textShadow: "1px 1px 8px rgba(0,0,0,0.7)",
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
                          ? `/destinations/${fav.destinationGuide?._id}`
                          : `/itinerary/${fav.tripItinerary?._id}`
                      )
                    }
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      color: "#fff",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "background 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(0,0,0,0.6)"
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(0,0,0,0.4)"
                    }
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleRemove(fav._id)}
                    style={{
                      background: "rgba(255,0,0,0.4)",
                      color: "#fff",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "background 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,0,0,0.6)"
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,0,0,0.4)"
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
