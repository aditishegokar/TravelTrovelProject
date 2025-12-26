import React, { useEffect, useState } from 'react';
import { getAllGroups } from '../../api/group.api';
import { IGroup } from '../../types/group';
import GroupCard from './GroupCard';

const AllGroups: React.FC = () => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const allGroups = await getAllGroups();
                setGroups(allGroups);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900"></div>
                <p className="mt-4 text-gray-600 text-sm">Loading groups...</p>
            </div>
        );
    }

    if (groups.length === 0) {
        return (
            <div className="text-center py-20">
                <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No groups available
                </h3>
                <p className="text-gray-500 text-sm">
                    Be the first to create a group and start connecting
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <GroupCard key={group._id} group={group} />
                ))}
            </div>
        </div>
    );
};

export default AllGroups;
