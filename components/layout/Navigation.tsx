'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export interface NavLink {
  href: string;
  label: string;
}

export interface NavigationProps {
  links: NavLink[];
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ links, className = '' }) => {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };
  
  return (
    <nav className={`flex items-center space-x-1 ${className}`}>
      {links.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${active 
                ? 'bg-saffron-100 text-saffron-800 shadow-sm' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'
              }
            `}
            aria-current={active ? 'page' : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};
