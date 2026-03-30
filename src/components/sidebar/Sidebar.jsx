import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import img from '../../assets/data-strategy-statistic-svgrepo-com (1).svg';
import { 
  UsersIcon, 
  ShoppingBagIcon, 
  ShoppingCartIcon, 
  ChartBarIcon, 
  ChatBubbleLeftIcon, 
  UserGroupIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="w-72 bg-black/95 backdrop-blur-lg border-r border-white/20 min-h-screen p-6 flex flex-col md:block hidden fixed left-0 top-0 z-40">
      {/* Logo/Top */}
      <div className="mb-10 pb-8 border-b border-white/20">
        <Link to="/customers" className="flex items-center gap-3">
          <span className="w-10 h-10 font-bold text-white"><img src={img} alt="" /></span>
          <span className="text-2xl font-bold text-white">
            DataStock Pro
          </span>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1.5">
        <Link 
          to="/customers" 
          className={`flex items-center gap-3 p-2.5 rounded-lg transition-all font-medium group ${location.pathname === '/customers' || location.pathname === '/dashboard' ? 'bg-slate-800/70 hover:bg-slate-700/70 text-white' : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'}`}
        >
          <UsersIcon className="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span>Customers</span>
        </Link>
        
        <Link 
          to="/orders" 
          className={`flex items-center gap-3 p-2.5 rounded-lg transition-all font-medium group ${location.pathname === '/orders' ? 'bg-slate-800/70 hover:bg-slate-700/70 text-white' : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'}`}
        >
          <ShoppingCartIcon className="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span>Orders</span>
        </Link>
        
        <Link 
          to="/products" 
          className={`flex items-center gap-3 p-2.5 rounded-lg transition-all font-medium group ${location.pathname === '/products' ? 'bg-slate-800/70 hover:bg-slate-700/70 text-white' : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'}`}
        >
          <ShoppingBagIcon className="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span>Products</span>
        </Link>
        
        <Link 
          to="/analytics" 
          className={`flex items-center gap-3 p-2.5 rounded-lg transition-all font-medium group ${location.pathname === '/analytics' ? 'bg-slate-800/70 hover:bg-slate-700/70 text-white' : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'}`}
        >
          <ChartBarIcon className="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span>Analytics</span>
        </Link>
        
        <Link 
          to="/feedback" 
          className={`flex mb-8 items-center gap-3 p-2.5 rounded-lg transition-all font-medium group ${location.pathname === '/feedback' ? 'bg-slate-800/70 hover:bg-slate-700/70 text-white' : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'}`}
        >
          <ChatBubbleLeftIcon className="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span>Feedback</span>
        </Link>
        
{profile?.is_admin && (
          <Link 
            to="/team" 
            className={`flex items-center gap-3 p-2.5 rounded-lg transition-all font-medium group ${location.pathname === '/team' ? 'bg-slate-800/70 hover:bg-slate-700/70 text-white' : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'}`}
          >
            <UserGroupIcon className="h-5 w-5 text-slate-300 group-hover:text-white" />
            <span>Team</span>
          </Link>
        )}
      </nav>

      {/* Logout Bottom */}
      <div className="mt-auto pt-8 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-900/80 backdrop-blur-sm transition-all font-medium text-left text-rose-300 hover:text-rose-200 group"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-rose-300 group-hover:text-rose-200" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
