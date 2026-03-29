import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 transition rounded-lg font-medium"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
            <p className="text-gray-300 mb-4">
              {profile?.full_name || user?.email || 'User'}
            </p>
            <p className="text-sm text-gray-400">
              ID: {user?.id?.slice(0, 8)}...
            </p>
            {profile?.is_admin && (
              <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <span className="font-semibold text-yellow-300">Admin Access</span>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Projects</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between">
                <span>Active Sessions</span>
                <span className="font-bold">3</span>
              </div>
              <div className="flex justify-between">
                <span>Storage Used</span>
                <span className="font-bold">2.4 GB</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Project uploaded 2h ago</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Settings updated</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Backup completed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

