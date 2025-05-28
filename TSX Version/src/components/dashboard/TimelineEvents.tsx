import React from 'react';
import { TimelineEvent } from '../../types';
import { Clock, AlertTriangle, User, Network, Server } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineEventsProps {
  events: TimelineEvent[];
}

const TimelineEvents: React.FC<TimelineEventsProps> = ({ events }) => {
  // Function to determine the icon based on event type
  const getEventIcon = (type: string, severity?: string) => {
    switch (type) {
      case 'alert':
        return (
          <div className={`p-2 rounded-full ${
            severity === 'critical' ? 'bg-error-600/20 text-error-500' :
            severity === 'high' ? 'bg-error-500/20 text-error-400' :
            severity === 'medium' ? 'bg-warning-500/20 text-warning-500' :
            'bg-success-500/20 text-success-500'
          }`}>
            <AlertTriangle size={16} />
          </div>
        );
      case 'user':
        return (
          <div className="p-2 rounded-full bg-primary-600/20 text-primary-500">
            <User size={16} />
          </div>
        );
      case 'network':
        return (
          <div className="p-2 rounded-full bg-secondary-600/20 text-secondary-500">
            <Network size={16} />
          </div>
        );
      case 'system':
        return (
          <div className="p-2 rounded-full bg-dark-500/20 text-gray-400">
            <Server size={16} />
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-full bg-dark-500/20 text-gray-400">
            <Clock size={16} />
          </div>
        );
    }
  };

  // Function to format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-dark-800 rounded-lg shadow-md overflow-hidden h-full">
      <div className="p-4 bg-dark-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-400" />
          Activity Timeline
        </h2>
        <button className="text-sm text-primary-400 hover:text-primary-300">
          View All
        </button>
      </div>
      
      <div className="p-2 overflow-y-auto max-h-[400px]">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative pl-8 pb-4"
          >
            {/* Timeline line */}
            {index < events.length - 1 && (
              <div className="absolute left-[18px] top-8 bottom-0 w-0.5 bg-dark-600"></div>
            )}
            
            {/* Timeline icon */}
            <div className="absolute left-0 top-0">
              {getEventIcon(event.type, event.severity)}
            </div>
            
            {/* Timeline content */}
            <div className="bg-dark-700/50 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-white">{event.title}</h3>
                <span className="text-xs text-gray-400">{formatTime(event.timestamp)}</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">{event.description}</p>
              {event.severity && (
                <span className={`mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  event.severity === 'critical' ? 'bg-error-600/20 text-error-500' :
                  event.severity === 'high' ? 'bg-error-500/20 text-error-400' :
                  event.severity === 'medium' ? 'bg-warning-500/20 text-warning-500' :
                  'bg-success-500/20 text-success-500'
                }`}>
                  {event.severity}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TimelineEvents;