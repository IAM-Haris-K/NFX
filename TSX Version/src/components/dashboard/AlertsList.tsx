import React from 'react';
import { SecurityAlert } from '../../types';
import { motion } from 'framer-motion';
import { AlertTriangle, Eye, CheckCircle, XCircle } from 'lucide-react';

interface AlertsListProps {
  alerts: SecurityAlert[];
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  // Function to determine severity class
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-error-600/20 text-error-500 border-error-500/20';
      case 'high':
        return 'bg-error-500/10 text-error-400 border-error-400/20';
      case 'medium':
        return 'bg-warning-500/10 text-warning-500 border-warning-500/20';
      case 'low':
        return 'bg-success-500/10 text-success-500 border-success-500/20';
      default:
        return 'bg-gray-600/10 text-gray-400 border-gray-400/20';
    }
  };

  // Function to format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-dark-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-dark-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-error-500" />
          Recent Alerts
        </h2>
        <button className="text-sm text-primary-400 hover:text-primary-300">
          View All
        </button>
      </div>
      
      <div className="divide-y divide-dark-600">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 hover:bg-dark-700/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityClass(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">{formatTime(alert.timestamp)}</span>
                </div>
                <h3 className="mt-1 text-sm font-medium text-white">{alert.title}</h3>
                <p className="mt-1 text-xs text-gray-400">{alert.description}</p>
                
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <span>Source: {alert.sourceIp}</span>
                  <span className="mx-2">→</span>
                  <span>Destination: {alert.destinationIp}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button className="p-1 rounded-full hover:bg-dark-600 text-gray-400 hover:text-white">
                  <Eye size={16} />
                </button>
                <button className="p-1 rounded-full hover:bg-dark-600 text-gray-400 hover:text-white">
                  <CheckCircle size={16} />
                </button>
                <button className="p-1 rounded-full hover:bg-dark-600 text-gray-400 hover:text-white">
                  <XCircle size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlertsList;