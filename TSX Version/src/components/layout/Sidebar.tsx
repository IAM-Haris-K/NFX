import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Activity, 
  AlertCircle, 
  Network, 
  FileSearch, 
  Globe, 
  Settings, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { NavItem } from '../../types';

interface SidebarProps {
  isOpen: boolean;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
  { name: 'Network Traffic', path: '/network', icon: 'Network' },
  { name: 'Alerts', path: '/alerts', icon: 'AlertCircle' },
  { name: 'Packet Analysis', path: '/packets', icon: 'FileSearch' },
  { name: 'Threat Intelligence', path: '/threats', icon: 'Globe' },
  { name: 'System Health', path: '/system', icon: 'Activity' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [expandedSection, setExpandedSection] = React.useState<string | null>('Monitoring');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard size={20} />;
      case 'Activity': return <Activity size={20} />;
      case 'AlertCircle': return <AlertCircle size={20} />;
      case 'Network': return <Network size={20} />;
      case 'FileSearch': return <FileSearch size={20} />;
      case 'Globe': return <Globe size={20} />;
      default: return <LayoutDashboard size={20} />;
    }
  };

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { 
      x: -320,
      opacity: 0.5,
      transition: { 
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 left-0 w-64 bg-dark-700 text-white z-10 shadow-xl lg:shadow-none lg:translate-x-0 overflow-y-auto"
        >
          <div className="p-4 space-y-6">
            <div className="space-y-1">
              <div 
                className="px-3 py-2 text-sm font-semibold text-gray-400 flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('Monitoring')}
              >
                <span>MONITORING</span>
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform ${expandedSection === 'Monitoring' ? 'rotate-180' : ''}`}
                />
              </div>
              
              {expandedSection === 'Monitoring' && (
                <div className="space-y-1 pl-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => 
                        `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive 
                            ? 'bg-primary-600 text-white' 
                            : 'text-gray-300 hover:bg-dark-600 hover:text-white'
                        }`
                      }
                    >
                      <span className="mr-3">{getIcon(item.icon)}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div 
                className="px-3 py-2 text-sm font-semibold text-gray-400 flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('Configuration')}
              >
                <span>CONFIGURATION</span>
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform ${expandedSection === 'Configuration' ? 'rotate-180' : ''}`}
                />
              </div>
              
              {expandedSection === 'Configuration' && (
                <div className="space-y-1 pl-2">
                  <NavLink
                    to="/settings"
                    className={({ isActive }) => 
                      `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-primary-600 text-white' 
                          : 'text-gray-300 hover:bg-dark-600 hover:text-white'
                      }`
                    }
                  >
                    <Settings size={20} className="mr-3" />
                    <span>Settings</span>
                  </NavLink>
                  <NavLink
                    to="/help"
                    className={({ isActive }) => 
                      `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-primary-600 text-white' 
                          : 'text-gray-300 hover:bg-dark-600 hover:text-white'
                      }`
                    }
                  >
                    <HelpCircle size={20} className="mr-3" />
                    <span>Help & Support</span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="bg-dark-600 rounded-md p-3 text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">System Status</span>
                <span className="px-2 py-1 bg-success-500 text-white text-xs rounded-full">Healthy</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Uptime: 7d 12h</span>
                <span>v1.2.3</span>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;