import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Click & Cart</h3>
            <p className="text-sm text-gray-600">
              Your one-stop shop for quality products. Built with Next.js and modern web technologies.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-saffron-600 transition-all duration-200 hover:translate-x-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-saffron-600 transition-all duration-200 hover:translate-x-1 inline-block">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-gray-600 hover:text-saffron-600 transition-all duration-200 hover:translate-x-1 inline-block">
                  Admin Panel
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="text-sm text-gray-600 hover:text-saffron-600 transition-all duration-200 hover:translate-x-1 inline-block">
                  Recommendations
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: info@eshop.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Commerce St, City, State 12345</li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {currentYear} Click & Cart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
