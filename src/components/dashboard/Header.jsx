import { FileText, User, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-slate-900">OCR/KIE App</span>
        </Link>

        {/* User Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <User className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
