import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGroup } from '../../api/group.api';
import Layout from '../../components/common/Layout';

const CreateGroup: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await createGroup({ name, description, isPublic });
            navigate('/groups');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create group');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                <div className="max-w-2xl mx-auto px-4 py-12">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/groups')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        <span className="text-sm font-medium">Back to Groups</span>
                    </button>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Group</h1>
                        <p className="text-gray-600">
                            Start a community for travelers to connect and share
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Group Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Group Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g., Adventure Seekers"
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe what your group is about..."
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none transition-all"
                                />
                            </div>

                            {/* Privacy Toggle */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="isPublic"
                                        type="checkbox"
                                        checked={isPublic}
                                        onChange={(e) => setIsPublic(e.target.checked)}
                                        className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-gray-400"
                                    />
                                </div>
                                <div className="ml-3">
                                    <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
                                        Public Group
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Public groups can be discovered and joined by anyone
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/groups')}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !name.trim()}
                                    className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Creating...
                                        </span>
                                    ) : (
                                        'Create Group'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateGroup;
