import React from 'react';
import { Home, Users, Settings, Hotel,TicketsPlane, LoaderPinwheel, NotepadText, Table, Table2, Play, File  } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64  shadow h-full ">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Foodly</h1>
        <nav className="space-y-8 text-yellow-500 ">
          <a href="/" className="flex items-center p-2 text-yellow-500 hover:bg-gray-100 rounded">
            <Home className="w-5 h-5 mr-2" /> Dashboard
          </a>
          <a href="/food" className="flex items-center p-2 text-yellow-500 hover:bg-gray-100 rounded">
            <Play  className="w-5 h-5 mr-2" /> Food
          </a>
          <a href="/tables" className="flex items-center p-2 text-yellow-500 hover:bg-gray-100 rounded">
            <Table2 className="w-5 h-5 mr-2" /> Tables
          </a>
          
                <a href="/reservations" className="flex items-center p-2 text-yellow-500 hover:bg-gray-100 rounded">
            <NotepadText  className="w-5 h-5 mr-2" /> Reservations
          </a>
      

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
