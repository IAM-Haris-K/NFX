import React from 'react';
import { motion } from 'framer-motion';

const SecurityMap = () => {
  // Mock connections for visualization
  const connections = [
    { id: 1, from: { x: 150, y: 100 }, to: { x: 350, y: 150 }, status: 'normal' },
    { id: 2, from: { x: 150, y: 100 }, to: { x: 280, y: 220 }, status: 'suspicious' },
    { id: 3, from: { x: 150, y: 100 }, to: { x: 400, y: 300 }, status: 'malicious' },
    { id: 4, from: { x: 280, y: 220 }, to: { x: 500, y: 180 }, status: 'normal' },
    { id: 5, from: { x: 400, y: 300 }, to: { x: 520, y: 350 }, status: 'suspicious' },
  ];

  const nodes = [
    { id: 1, x: 150, y: 100, type: 'server', label: 'Internal Server' },
    { id: 2, x: 280, y: 220, type: 'workstation', label: 'Workstation' },
    { id: 3, x: 350, y: 150, type: 'database', label: 'Database' },
    { id: 4, x: 400, y: 300, type: 'router', label: 'Router' },
    { id: 5, x: 500, y: 180, type: 'cloud', label: 'Cloud Service' },
    { id: 6, x: 520, y: 350, type: 'external', label: 'External Host' },
  ];

  const getConnectionColor = (status: string) => {
    switch (status) {
      case 'normal': return 'stroke-primary-500';
      case 'suspicious': return 'stroke-warning-500';
      case 'malicious': return 'stroke-error-500';
      default: return 'stroke-gray-500';
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'server': return 'bg-primary-600 text-white';
      case 'workstation': return 'bg-secondary-600 text-white';
      case 'database': return 'bg-success-600 text-white';
      case 'router': return 'bg-warning-600 text-white';
      case 'cloud': return 'bg-primary-400 text-white';
      case 'external': return 'bg-error-500 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="bg-dark-800 rounded-lg shadow-md p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Network Security Map</h2>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary-500 mr-1"></div>
            <span className="text-xs text-gray-400">Normal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-warning-500 mr-1"></div>
            <span className="text-xs text-gray-400">Suspicious</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-error-500 mr-1"></div>
            <span className="text-xs text-gray-400">Malicious</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[400px] border border-dark-600 rounded-lg overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 600 400">
          {/* Connections */}
          {connections.map((conn) => (
            <g key={conn.id}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 1.5, delay: conn.id * 0.2 }}
                d={`M${conn.from.x},${conn.from.y} L${conn.to.x},${conn.to.y}`}
                className={`${getConnectionColor(conn.status)} fill-none stroke-2 stroke-dasharray-[5,5]`}
                strokeLinecap="round"
              />
              
              {/* Animated data flow */}
              <motion.circle
                cx={conn.from.x}
                cy={conn.from.y}
                r={3}
                className={getConnectionColor(conn.status).replace('stroke-', 'fill-')}
                animate={{
                  cx: [conn.from.x, conn.to.x],
                  cy: [conn.from.y, conn.to.y],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: conn.id * 0.5,
                }}
              />
            </g>
          ))}
          
          {/* Nodes */}
          {nodes.map((node) => (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: node.id * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer"
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={25}
                className={getNodeColor(node.type)}
              />
              <text
                x={node.x}
                y={node.y + 45}
                textAnchor="middle"
                className="fill-gray-300 text-xs"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default SecurityMap;