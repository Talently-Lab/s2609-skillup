import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-slate-900 text-white p-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg text-primary flex items-center gap-2">
          <span>SkillUp Campus</span>
        </Link>
        <nav className="flex gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-indigo-300 transition-colors">Home</Link>
          <Link to="/catalog" className="hover:text-indigo-300 transition-colors">Catálogo</Link>
          <Link to="/login" className="hover:text-indigo-300 transition-colors">Login</Link>
          <Link to="/register" className="hover:text-indigo-300 transition-colors">Registro</Link>
          <Link to="/dashboard" className="hover:text-indigo-300 transition-colors">Mi Panel</Link>
          <Link to="/admin" className="hover:text-indigo-300 transition-colors">Admin</Link>
        </nav>
      </div>
    </header>
  );
}