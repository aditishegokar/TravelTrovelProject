import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGroupById, joinGroup, leaveGroup, inviteUser } from '../../api/group.api';
import { getAllUsers } from '../../api/user.api';
import { IGroup } from '../../types/group';
import { IUser } from '../../types/user';
import GroupChat from './GroupChat';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';

const GroupDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [group, setGroup] = useState<IGroup | null>(null);
    const [loading, setLoading] = useState(true);
    const { userId } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [inviteEmail, setInviteEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                if (id) {
                    const groupData = await getGroupById(id);
                    setGroup(groupData);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUsers = async () => {
            try {
                const res = await getAllUsers();
                setAllUsers(res.data.users);
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        fetchGroup();
        fetchUsers();
    }, [id]);

    const handleJoinGroup = async () => {
        try {
            if (id) {
                await joinGroup(id);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLeaveGroup = async () => {
        try {
            if (id) {
                await leaveGroup(id);
                navigate('/groups');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!inviteEmail) {
            setError('Please enter an email address.');
            return;
        }

        const userToInvite = allUsers.find((user) => user.email === inviteEmail);

        if (!userToInvite) {
            setError('User with this email not found.');
            return;
        }

        if (group?.members.some((member) => member._id === userToInvite._id)) {
            setError('This user is already a member of the group.');
            return;
        }

        try {
            if (id) {
                await inviteUser(id, userToInvite._id);
                setSuccess(`${inviteEmail} has been invited.`);
                setInviteEmail('');
                const groupData = await getGroupById(id);
                setGroup(groupData);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to invite user.');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900"></div>
                    <p className="mt-4 text-gray-600 text-sm">Loading group...</p>
                </div>
            </Layout>
        );
    }

    if (!group) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <svg
                        className="w-16 h-16 text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Group not found</h3>
                    <button
                        onClick={() => navigate('/groups')}
                        className="mt-4 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Back to Groups
                    </button>
                </div>
            </Layout>
        );
    }

    const isMember = group.members.some((member: IUser) => member._id === userId);
    const isOwner = group.owner._id === userId;

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${group.isPublic
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {group.isPublic ? 'Public' : 'Private'}
                                    </span>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{group.description}</p>
                            </div>

                            <div className="flex gap-2">
                                {isMember ? (
                                    <button
                                        onClick={handleLeaveGroup}
                                        className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                                    >
                                        Leave Group
                                    </button>
                                ) : (
                                    group.isPublic && (
                                        <button
                                            onClick={handleJoinGroup}
                                            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                                        >
                                            Join Group
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                {group.members.length} members
                            </span>
                            <span>•</span>
                            <span>Owner: {group.owner.username || group.owner.email}</span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Chat Section */}
                        <div className="lg:col-span-2">
                            {isMember ? (
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                        <h2 className="text-lg font-semibold text-gray-900">Group Chat</h2>
                                    </div>
                                    <GroupChat groupId={group._id} />
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
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
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                        Members Only
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        You must be a member to view the chat
                                    </p>
                                    {group.isPublic && (
                                        <button
                                            onClick={handleJoinGroup}
                                            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                                        >
                                            Join Group to Chat
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Members List */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Members ({group.members.length})
                                </h2>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {group.members.map((member: IUser) => (
                                        <div key={member._id} className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                                                {(member.username || member.email).charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {member.username || member.email}
                                                </p>
                                                {member._id === group.owner._id && (
                                                    <span className="text-xs text-gray-500">Owner</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Invite Section (Owner Only) */}
                            {isOwner && (
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite User</h3>
                                    <form onSubmit={handleInvite} className="space-y-3">
                                        <input
                                            type="email"
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                            placeholder="Enter user's email"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                                        >
                                            Send Invite
                                        </button>
                                    </form>
                                    {error && (
                                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-sm text-red-800">{error}</p>
                                        </div>
                                    )}
                                    {success && (
                                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-sm text-green-800">{success}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default GroupDetails;
