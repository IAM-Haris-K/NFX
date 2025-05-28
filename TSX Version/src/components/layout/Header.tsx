import React, { useState } from 'react';
import { Search, Bell, Settings, User, Shield, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const clearNotifications = () => {
    setNotifications(0);
  };

  return (
    <header className="bg-dark-800 text-white h-16 flex items-center justify-between px-4 z-20 shadow-md">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mr-3 text-gray-300 hover:text-white focus:outline-none"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-primary-500 mr-2" />
          <span className="text-xl font-bold tracking-tight">NFX</span>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-4 md:mx-8">
        <div className={`relative ${searchFocused ? 'ring-2 ring-primary-500' : ''}`}>
          <input
            type="text"
            placeholder="Search alerts, packets, IPs..."
            className="w-full bg-dark-600 text-white border-none rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center space-x-1 md:space-x-2">
        <motion.div className="relative" whileHover={{ scale: 1.05 }}>
          <button 
            className="p-2 rounded-full hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={clearNotifications}
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-300" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </motion.div>
        
        <motion.button 
          className="p-2 rounded-full hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          whileHover={{ scale: 1.05 }}
          aria-label="Settings"
        >
          <Settings size={20} className="text-gray-300" />
        </motion.button>
        
        <motion.div 
          className="flex items-center space-x-2 pl-2 cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="hidden md:block text-sm font-medium">Admin</span>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;