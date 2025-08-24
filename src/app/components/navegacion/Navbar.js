'use client'

import { useState } from 'react';
import Image from "next/image"
import { Sidebar } from './Sidebar';
import Link from 'next/link';

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors shadow-sm hover:shadow-md"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <div className="w-5 h-0.5 bg-current"></div>
              <div className="w-5 h-0.5 bg-current"></div>
              <div className="w-5 h-0.5 bg-current"></div>
            </div>
            <span className="sr-only">Open menu</span>
          </button>

          {/* SIGNA Logo */}
          <div className="flex items-center gap-2">
            <Link  href="/">
              <Image 
                src="https://res.cloudinary.com/daxzzj8lh/image/upload/v1755984729/portaafolio/image_rhd0v3.webp"  
                alt="logo" 
                width={150} 
                height={150}
                className="drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Right spacer to center the logo */}
          <div className="w-10"></div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  )
}