import React from 'react';
import { Link } from 'react-router-dom';
import { IGroup } from '../../types/group';

interface GroupCardProps {
    group: IGroup;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
    return (
        <div className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-gray-600"
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
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                {group.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                {group.description}
            </p>

            <Link to={`/groups/${group._id}`}>
                <button className="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    View Group
                </button>
            </Link>
        </div>
    );
};

export default GroupCard;
