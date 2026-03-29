import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-8 md:p-12 flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-semibold max-w-3xl text-white mx-auto">
              Feedback
            </h1>
            <p className="text-slate-300 md:text-base max-w-md mx-auto mt-3">
              Feedback section - Collect and review customer feedback.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;

