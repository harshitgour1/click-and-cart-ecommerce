'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Navigation, NavLink } from './Navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/admin', label: 'Admin' },
  { href: '/recommendations', label: 'Recommendations' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const { user, isAuthenticated, logout } = useAuth();
  
  const cartItemCount = 3;
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white/95 shadow-soft border-b border-saffron-100 sticky top-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="paisley-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 10 Q60 20 60 35 Q60 50 50 60 Q40 50 40 35 Q40 20 50 10 M50 15 Q55 22 55 35 Q55 48 50 55 Q45 48 45 35 Q45 22 50 15" fill="currentColor" className="text-saffron-500"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#paisley-pattern)" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 group-hover:animate-mandala transition-transform duration-300">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="url(#logo-gradient)" strokeWidth="2"/>
                  <circle cx="20" cy="20" r="12" fill="none" stroke="url(#logo-gradient)" strokeWidth="1.5"/>
                  <circle cx="20" cy="20" r="6" fill="url(#logo-gradient)"/>
                  <path d="M20 2 L20 8 M20 32 L20 38 M2 20 L8 20 M32 20 L38 20" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 8 L12 12 M28 28 L32 32 M32 8 L28 12 M12 28 L8 32" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF8833"/>
                      <stop offset="100%" stopColor="#4080FF"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-2xl font-bold font-heading bg-gradient-saffron bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
                {language === 'en' ? 'Click & Cart' : 'क्लिक और कार्ट'}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Navigation links={navLinks} />
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-saffron-50 hover:text-saffron-700 rounded-md transition-colors border border-gray-300"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'हि' : 'EN'}
            </button>

            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:bg-saffron-50 hover:text-saffron-700 rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-saffron-500 to-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-saffron-50 hover:text-saffron-700 rounded-md transition-colors"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 bg-gradient-saffron rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:block font-medium">{user?.name || 'User'}</span>
                  <svg className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-saffron-100">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-saffron-50 hover:text-saffron-700 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/recommendations"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-saffron-50 hover:text-saffron-700 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Recommendations
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-saffron-50 hover:text-saffron-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-gradient-saffron text-white font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            )}

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:bg-saffron-50 hover:text-saffron-700 rounded-md transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-saffron-100">
            <Navigation links={navLinks} className="flex-col items-start space-y-2 space-x-0" />
          </div>
        )}
      </div>
    </header>
  );
};
