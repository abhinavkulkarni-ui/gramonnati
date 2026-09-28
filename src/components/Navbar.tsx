import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserCircle, LogOut, Menu, X, ArrowRight, Globe } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import RuralRiseLogo from './RuralRiseLogo';
import { useLanguage } from '../lib/i18n';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, toggleLanguage, t, isMarathi } = useLanguage();

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
    localStorage.removeItem('user');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.home', 'Home'), path: '/' },
    { name: t('nav.marketplace', 'Marketplace'), path: '/marketplace' },
    { name: t('nav.dashboard', 'Dashboard'), path: user ? '/dashboard' : '/login' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdfbf7]/95 backdrop-blur-md text-[#1a281f] border-b border-[#e2eae3] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Gramonnati Realistic Brand Logo */}
          <Link to="/" className="flex items-center group transition-transform hover:scale-[1.02]">
            <RuralRiseLogo size="md" showText={true} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'text-[#143d24] bg-[#e6f1e8] shadow-xs'
                    : 'text-[#415b49] hover:text-[#143d24] hover:bg-[#eef4ee]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#1b6b3b] rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white hover:bg-emerald-50 text-[#143d24] border border-[#2d6a4f]/30 shadow-xs hover:border-[#2d6a4f] transition-all hover:scale-105 active:scale-95"
              title="Toggle English / मराठी भाषा बदला"
            >
              <Globe className="h-4 w-4 text-[#16a34a]" />
              <span className={language === 'mr' ? 'font-black text-[#15803d] underline decoration-2' : 'text-gray-400 font-medium'}>मराठी</span>
              <span className="text-gray-300 font-light">|</span>
              <span className={language === 'en' ? 'font-black text-[#15803d] underline decoration-2' : 'text-gray-400 font-medium'}>English</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm font-medium text-[#143d24] bg-white/90 hover:bg-[#f0f7f2] px-3.5 py-1.5 rounded-full border border-[#cddfc0] shadow-xs transition"
                >
                  <UserCircle className="h-4 w-4 text-[#2d6a4f]" />
                  <span className="max-w-[120px] truncate">{user.name || 'User'}</span>
                  <span className="text-[10px] bg-gradient-to-r from-[#14532d] to-[#15803d] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {user.role === 'farmer' ? (isMarathi ? 'शेतकरी' : 'Farmer') : user.role === 'laborer' ? (isMarathi ? 'शेतमजूर' : 'Laborer') : (isMarathi ? 'प्रशासक' : 'Admin')}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-[#5f7365] hover:text-red-600 hover:bg-red-50 rounded-full transition"
                  title={t('nav.logout', 'Logout')}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-[#143d24] hover:text-[#166534] px-3 py-2 transition"
                >
                  {t('nav.signIn', 'Sign In')}
                </Link>
                <Link
                  to="/login?mode=signup"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#14532d] via-[#166534] to-[#15803d] hover:brightness-110 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>{t('nav.register', 'Register')}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#fde047]" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-[#143d24] border border-[#2d6a4f]/40 shadow-xs active:scale-95 transition"
              title="मराठी / English भाषा बदला"
            >
              <Globe className="h-3.5 w-3.5 text-[#16a34a]" />
              <span className={language === 'mr' ? 'text-[#15803d] font-black' : 'text-gray-400 font-medium'}>मराठी</span>
              <span className="text-gray-300">/</span>
              <span className={language === 'en' ? 'text-[#15803d] font-black' : 'text-gray-400 font-medium'}>EN</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#143d24] hover:bg-[#eef4ee] transition"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fdfbf7] border-b border-[#e2eae3] px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          {/* Language Selector Row in Drawer */}
          <div className="flex items-center justify-between py-2 px-3 bg-[#eef5ee] rounded-xl text-xs font-bold text-[#183925]">
            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-[#2d6a4f]" />
              {isMarathi ? 'भाषा निवडा:' : 'Choose Language:'}
            </span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#cfdfd2]">
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${language === 'mr' ? 'bg-[#183925] text-white shadow-2xs' : 'text-gray-600'}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${language === 'en' ? 'bg-[#183925] text-white shadow-2xs' : 'text-gray-600'}`}
              >
                English
              </button>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-base font-semibold ${
                isActive(link.path)
                  ? 'bg-[#e6f1e8] text-[#143d24]'
                  : 'text-[#415b49] hover:bg-gray-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#e2eae3] flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-white text-[#143d24] font-semibold border border-[#cddfc0]"
                >
                  <span>{user.name} ({user.role === 'farmer' ? (isMarathi ? 'शेतकरी' : 'Farmer') : user.role === 'laborer' ? (isMarathi ? 'शेतमजूर' : 'Laborer') : 'Admin'})</span>
                  <UserCircle className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 font-semibold hover:bg-red-50 rounded-xl"
                >
                  {t('nav.logout', 'Logout')}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#14532d] text-white py-3 rounded-full font-semibold shadow-md"
              >
                {t('nav.signIn', 'Sign In')} / {t('nav.register', 'Register')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
