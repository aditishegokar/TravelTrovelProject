// import React, { useEffect, useState } from 'react';
// import { getMyGroups } from '../../api/group.api';
// import { IGroup } from '../../types/group';
// import GroupCard from './GroupCard';
// import { Link } from 'react-router-dom';

// const MyGroups: React.FC = () => {
//     const [groups, setGroups] = useState<IGroup[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchGroups = async () => {
//             try {
//                 const myGroups = await getMyGroups();
//                 setGroups(myGroups);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchGroups();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex flex-col items-center justify-center py-20">
//                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900"></div>
//                 <p className="mt-4 text-gray-600 text-sm">Loading your groups...</p>
//             </div>
//         );
//     }

//     if (groups.length === 0) {
//         return (
//             <div className="text-center py-20">
//                 <svg
//                     className="w-16 h-16 text-gray-300 mx-auto mb-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                 >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                 </svg>
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                     You haven't joined any groups yet
//                 </h3>
//                 <p className="text-gray-500 text-sm mb-6">
//                     Create or join a group to connect with travelers
//                 </p>
//                 <Link to="/groups/create">
//                     <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
//                         Create Your First Group
//                     </button>
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {groups.map((group) => (
//                     <GroupCard key={group._id} group={group} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyGroups;

// import React, { useEffect, useState } from "react";
// import { getMyGroups } from "../../api/group.api";
// import { IGroup } from "../../types/group";
// import GroupCard from "./GroupCard";
// import { Link } from "react-router-dom";

// const MyGroups: React.FC = () => {
//   const [groups, setGroups] = useState<IGroup[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchGroups = async () => {
//       try {
//         const myGroups = await getMyGroups();
//         setGroups(myGroups);
//       } catch (error) {
//         console.error("Failed to fetch my groups", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGroups();
//   }, []);

//   return (
//     /* ===== BACKGROUND ===== */
//     <div
//       className="min-h-screen relative bg-cover bg-center px-6 py-16"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1950&q=80')",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-emerald-900/60 to-teal-900/70" />

//       {/* Glow */}
//       <div className="absolute top-24 left-12 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl" />
//       <div className="absolute bottom-24 right-12 w-72 h-72 bg-teal-500/30 rounded-full blur-3xl" />

//       {/* ===== CONTENT ===== */}
//       <div className="relative z-10 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
//           <h1 className="text-3xl font-bold text-white mb-3 sm:mb-0">
//             My Groups
//           </h1>
//           <p className="text-emerald-200 text-sm">
//             Communities you’re part of
//           </p>
//         </div>

//         {/* ===== LOADING STATE ===== */}
//         {loading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <div
//                 key={i}
//                 className="animate-pulse bg-white/20 backdrop-blur-xl
//                            border border-white/30 rounded-2xl p-6"
//               >
//                 <div className="h-4 bg-white/30 rounded w-3/4 mb-3" />
//                 <div className="h-3 bg-white/30 rounded w-full mb-2" />
//                 <div className="h-3 bg-white/30 rounded w-5/6" />
//                 <div className="mt-4 h-8 bg-white/30 rounded w-1/2" />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ===== EMPTY STATE ===== */}
//         {!loading && groups.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-32 text-center text-white">
//             <div className="text-6xl mb-4">👥</div>
//             <h2 className="text-2xl font-semibold mb-2">
//               You haven’t joined any groups yet
//             </h2>
//             <p className="text-emerald-200 max-w-md mb-6">
//               Start or join a group to connect with travelers and build your
//               community.
//             </p>
//             <Link to="/groups/create">
//               <button className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-white transition">
//                 Create Your First Group
//               </button>
//             </Link>
//           </div>
//         )}

//         {/* ===== GROUPS GRID ===== */}
//         {!loading && groups.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {groups.map((group) => (
//               <div
//                 key={group._id}
//                 className="bg-white/20 backdrop-blur-xl
//                            border border-white/30
//                            rounded-2xl shadow-xl
//                            hover:shadow-2xl hover:-translate-y-1
//                            transition-all duration-300"
//               >
//                 <GroupCard group={group} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyGroups;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyGroups } from "../../api/group.api";
import { IGroup } from "../../types/group";
import GroupCard from "./GroupCard";

// ✅ Import local AVIF background image
import myGroupsBg from "../../assets/MyGroups.avif";

const MyGroups: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const myGroups = await getMyGroups();
        setGroups(myGroups);
      } catch (error) {
        console.error("Failed to fetch my groups", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    /* ===== BACKGROUND ===== */
    <div
      className="min-h-screen relative bg-cover bg-center px-6 py-16"
      style={{
        backgroundImage: `url(${myGroupsBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-emerald-900/60 to-teal-900/70" />

      {/* Glow Effects */}
      <div className="absolute top-24 left-12 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-24 right-12 w-72 h-72 bg-teal-500/30 rounded-full blur-3xl" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl font-bold text-white mb-3 sm:mb-0">
            My Groups
          </h1>
          <p className="text-emerald-200 text-sm">
            Communities you’re part of
          </p>
        </div>

        {/* ===== LOADING STATE ===== */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white/20 backdrop-blur-xl
                           border border-white/30 rounded-2xl p-6"
              >
                <div className="h-4 bg-white/30 rounded w-3/4 mb-3" />
                <div className="h-3 bg-white/30 rounded w-full mb-2" />
                <div className="h-3 bg-white/30 rounded w-5/6" />
                <div className="mt-4 h-8 bg-white/30 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* ===== EMPTY STATE ===== */}
        {!loading && groups.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center text-white">
            <div className="text-6xl mb-4">👥</div>
            <h2 className="text-2xl font-semibold mb-2">
              You haven’t joined any groups yet
            </h2>
            <p className="text-emerald-200 max-w-md mb-6">
              Start or join a group to connect with travelers and build your
              community.
            </p>
            <Link to="/groups/create">
              <button className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-white transition">
                Create Your First Group
              </button>
            </Link>
          </div>
        )}

        {/* ===== GROUPS GRID ===== */}
        {!loading && groups.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div
                key={group._id}
                className="bg-white/20 backdrop-blur-xl
                           border border-white/30
                           rounded-2xl shadow-xl
                           hover:shadow-2xl hover:-translate-y-1
                           transition-all duration-300"
              >
                <GroupCard group={group} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGroups;
