import React from 'react';
import { motion } from 'framer-motion';
import { ThreatIntelligence } from '../../types';
import { ShieldAlert, ExternalLink, AlertTriangle, Globe, File, Mail } from 'lucide-react';

interface ThreatDetectionCardProps {
  threat: ThreatIntelligence;
}

const ThreatDetectionCard: React.FC<ThreatDetectionCardProps> = ({ threat }) => {
  const getIcon = () => {
    switch (threat.type) {
      case 'ip':
        return <Globe size={16} />;
      case 'domain':
        return <Globe size={16} />;
      case 'url':
        return <ExternalLink size={16} />;
      case 'file':
        return <File size={16} />;
      case 'email':
        return <Mail size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const getSeverityColor = () => {
    switch (threat.severity) {
      case 'critical':
        return 'bg-error-600 text-white';
      case 'high':
        return 'bg-error-500 text-white';
      case 'medium':
        return 'bg-warning-500 text-white';
      case 'low':
        return 'bg-success-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getConfidenceColor = () => {
    if (threat.confidence >= 90) return 'text-success-500';
    if (threat.confidence >= 70) return 'text-warning-500';
    return 'text-error-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-700 rounded-lg shadow-md overflow-hidden border border-dark-600"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className={`p-2 rounded-full mr-3 ${
              threat.severity === 'critical' ? 'bg-error-600/20 text-error-500' :
              threat.severity === 'high' ? 'bg-error-500/20 text-error-400' :
              threat.severity === 'medium' ? 'bg-warning-500/20 text-warning-500' :
              'bg-success-500/20 text-success-500'
            }`}>
              <ShieldAlert size={18} />
            </div>
            <div>
              <div className="flex items-center">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor()}`}>
                  {threat.severity}
                </span>
                <span className={`ml-2 text-xs font-medium ${getConfidenceColor()}`}>
                  {threat.confidence}% confidence
                </span>
              </div>
              <h3 className="mt-1 text-sm font-medium text-white">
                {threat.indicator}
              </h3>
            </div>
          </div>
        </div>

        <p className="mt-2 text-xs text-gray-400">
          {threat.description}
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <span className="flex items-center">
              {getIcon()}
              <span className="ml-1">{threat.type}</span>
            </span>
            <span className="mx-2">•</span>
            <span>{threat.source}</span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {threat.tags.map((tag, index) => (
            <span key={index} className="px-2 py-0.5 bg-dark-600 text-gray-300 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="bg-dark-800 px-4 py-2 flex justify-between items-center">
        <span className="text-xs text-gray-400">
          Detected {new Date(threat.timestamp).toLocaleDateString()}
        </span>
        <div className="flex space-x-2">
          <button className="px-2 py-1 bg-dark-600 text-xs text-gray-300 rounded hover:bg-dark-500">
            Block
          </button>
          <button className="px-2 py-1 bg-primary-600 text-xs text-white rounded hover:bg-primary-700">
            Investigate
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ThreatDetectionCard;