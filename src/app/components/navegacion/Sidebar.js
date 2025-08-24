import { X } from 'lucide-react';
import React from 'react';

export function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed left-0 top-0 w-64 bg-white h-full shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={toggleSidebar} className="p-4 text-gray-600 hover:text-gray-900">
            <X className="w-5 h-5" />
        </button>
        <nav className="p-4">
          <ul>
            <li className="py-2"><a href="/" className="text-gray-600 hover:text-gray-900">Inicio</a></li>
            <li className="py-2"><a href="/panel" className="text-gray-600 hover:text-gray-900">Panel</a></li>
            <li className="py-2"><a href="/registro" className="text-gray-600 hover:text-gray-900">Registro de Marca</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
