import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import img from '../../assets/data-strategy-statistic-svgrepo-com (1).svg';

const Sidebar = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="w-72 bg-black/95 backdrop-blur-lg border-r border-white/20 min-h-screen p-6 flex flex-col md:block hidden fixed left-0 top-0 z-40">
      {/* Logo/Top */}
      <div className="mb-10 pb-8 border-b border-white/20">
        <Link to="/dashboard" className="flex items-center gap-3">
          <span className="w-10 h-10 font-bold text-white"><img src={img} alt="" /></span>
          <span className="text-2xl font-bold text-white">
            DataStock Pro
          </span>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1.5">
        <Link 
          to="/dashboard" 
          className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/70 hover:bg-slate-700/70 transition-all font-medium"
        >
          <span className="hover:text-white">Dashboard</span>
        </Link>
        
        <Link 
          to="/analytics" 
          className="flex items-center gap-3 p-2.5 rounded-lg transition-all hover:bg-slate-700/50 font-medium"
        >
          <span className="hover:text-white">Analytics</span>
        </Link>
        
        <Link 
          to="/projects" 
          className="flex items-center gap-3 p-2.5 rounded-lg transition-all hover:bg-slate-700/50 font-medium"
        >
          <span className="hover:text-white">Projects</span>
        </Link>
        
        <Link 
          to="/settings" 
          className="flex items-center gap-3 p-2.5 rounded-lg transition-all hover:bg-slate-700/50 font-medium"
        >
          <span className="hover:text-white">Settings</span>
        </Link>
        
        {profile?.is_admin && (
          <Link 
            to="/team" 
            className="flex items-center gap-3 p-2.5 rounded-lg transition-all hover:bg-slate-700/50 font-medium"
          >
            <span className="text-xs font-bold text-slate-300">👥</span>
            <span className="hover:text-white">Team</span>
          </Link>
        )}
      </nav>

      {/* Logout Bottom */}
      <div className="mt-auto pt-8 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-900/80 backdrop-blur-sm transition-all font-medium text-left text-rose-300 hover:text-rose-200"
        >
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
