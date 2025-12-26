import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import MyGroups from './MyGroups';
import PublicGroups from './PublicGroups';
import AllGroups from './AllGroups';

const Groups: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all-groups');

    const tabs = [
        { id: 'all-groups', label: 'All Groups' },
        { id: 'my-groups', label: 'My Groups' },
        { id: 'public-groups', label: 'Public Groups' },
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Groups
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Connect with travelers and share experiences
                            </p>
                        </div>
                        <Link to="/groups/create">
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Create Group
                            </button>
                        </Link>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-8">
                        <nav className="-mb-px flex gap-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-gray-900 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'all-groups' && <AllGroups />}
                        {activeTab === 'my-groups' && <MyGroups />}
                        {activeTab === 'public-groups' && <PublicGroups />}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Groups;
