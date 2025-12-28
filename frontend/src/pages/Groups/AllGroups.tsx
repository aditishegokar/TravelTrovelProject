// import React, { useEffect, useState } from 'react';
// import { getAllGroups } from '../../api/group.api';
// import { IGroup } from '../../types/group';
// import GroupCard from './GroupCard';

// const AllGroups: React.FC = () => {
//     const [groups, setGroups] = useState<IGroup[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchGroups = async () => {
//             try {
//                 const allGroups = await getAllGroups();
//                 setGroups(allGroups);
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
//                 <p className="mt-4 text-gray-600 text-sm">Loading groups...</p>
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
//                     No groups available
//                 </h3>
//                 <p className="text-gray-500 text-sm">
//                     Be the first to create a group and start connecting
//                 </p>
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

// export default AllGroups;

// import React, { useEffect, useState } from "react";
// import { getAllGroups } from "../../api/group.api";
// import { IGroup } from "../../types/group";
// import GroupCard from "./GroupCard";

// const AllGroups: React.FC = () => {
//   const [groups, setGroups] = useState<IGroup[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchGroups = async () => {
//       try {
//         const allGroups = await getAllGroups();
//         setGroups(allGroups);
//       } catch (error) {
//         console.error("Failed to fetch groups", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGroups();
//   }, []);

//   return (
//     <div
//       className="min-h-screen relative bg-cover bg-center px-6 py-16"
//       style={{
//         backgroundImage:
//           "url('https://s3.india.com/wp-content/uploads/2024/09/adventure-4.jpg?impolicy=Medium_Widthonly&w=350&h=263')",
//       }}>
//       {/* Dark overlay for readability */}
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

//       {/* Ambient glows */}
//       <div className="absolute top-20 left-16 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl" />
//       <div className="absolute bottom-20 right-16 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />

//       <div className="relative z-10 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-12 text-center">
//           <h1 className="text-4xl font-bold text-white drop-shadow-lg">
//             Discover Groups
//           </h1>
//           <p className="text-indigo-200 mt-2">
//             Explore communities and travel together
//           </p>
//         </div>

//         {/* Loading state */}
//         {loading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <div
//                 key={i}
//                 className="
//                   animate-pulse
//                   bg-white/20
//                   backdrop-blur-3xl
//                   border border-white/30
//                   rounded-3xl
//                   p-6
//                 "
//               >
//                 <div className="h-4 bg-white/40 rounded w-3/4 mb-3" />
//                 <div className="h-3 bg-white/40 rounded w-full mb-2" />
//                 <div className="h-3 bg-white/40 rounded w-5/6" />
//                 <div className="mt-4 h-8 bg-white/40 rounded w-1/2" />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Empty state */}
//         {!loading && groups.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-32 text-center text-white">
//             <div className="text-6xl mb-4">🤖</div>
//             <h2 className="text-2xl font-semibold mb-2">No groups found</h2>
//             <p className="text-indigo-200 max-w-md">
//               Be the first to create a group and start your journey.
//             </p>
//           </div>
//         )}

//         {/* Groups grid */}
//         {!loading && groups.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {groups.map((group) => (
//               <div
//                 key={group._id}
//                 className="
//                   relative
//                   rounded-3xl
//                   overflow-hidden
//                   bg-white/10
//                   backdrop-blur-3xl
//                   border border-white/30
//                   shadow-lg
//                   hover:shadow-2xl
//                   hover:-translate-y-2
//                   transition-all duration-300
//                 "
//               >
//                 {/* Subtle gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/0" />

//                 {/* Card content */}
//                 <div className="relative z-10 p-6">
//                   <GroupCard group={group} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllGroups;



import React, { useEffect, useState } from "react";
import { getAllGroups } from "../../api/group.api";
import { IGroup } from "../../types/group";
import GroupCard from "./GroupCard";

// ✅ Import local avif background
import allGroupsBg from "../../assets/allgroupss.avif";

const AllGroups: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const allGroups = await getAllGroups();
        setGroups(allGroups);
      } catch (error) {
        console.error("Failed to fetch groups", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div
      className="min-h-screen relative bg-cover bg-center px-6 py-16"
      style={{
        backgroundImage: `url(${allGroupsBg})`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Ambient glows */}
      <div className="absolute top-20 left-16 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-16 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Discover Groups
          </h1>
          <p className="text-indigo-200 mt-2">
            Explore communities and travel together
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="
                  animate-pulse
                  bg-white/20
                  backdrop-blur-3xl
                  border border-white/30
                  rounded-3xl
                  p-6
                "
              >
                <div className="h-4 bg-white/40 rounded w-3/4 mb-3" />
                <div className="h-3 bg-white/40 rounded w-full mb-2" />
                <div className="h-3 bg-white/40 rounded w-5/6" />
                <div className="mt-4 h-8 bg-white/40 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && groups.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center text-white">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-2xl font-semibold mb-2">No groups found</h2>
            <p className="text-indigo-200 max-w-md">
              Be the first to create a group and start your journey.
            </p>
          </div>
        )}

        {/* Groups grid */}
        {!loading && groups.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group) => (
              <div
                key={group._id}
                className="
                  relative
                  rounded-3xl
                  overflow-hidden
                  bg-white/10
                  backdrop-blur-3xl
                  border border-white/30
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all duration-300
                "
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/0" />

                {/* Card content */}
                <div className="relative z-10 p-6">
                  <GroupCard group={group} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGroups;



