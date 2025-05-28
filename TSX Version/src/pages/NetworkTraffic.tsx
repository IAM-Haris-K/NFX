import React from 'react';
import { motion } from 'framer-motion';
import { Network, Filter, Download, RefreshCcw } from 'lucide-react';
import PacketTable from '../components/dashboard/PacketTable';
import { mockPackets } from '../data/mockData';

const NetworkTraffic: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Network className="mr-2 h-6 w-6 text-primary-500" />
            Network Traffic
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Monitor and analyze network communications
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-white text-sm rounded-md flex items-center">
            <Filter className="h-4 w-4 mr-1.5" />
            Filters
          </button>
          <button className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-white text-sm rounded-md flex items-center">
            <Download className="h-4 w-4 mr-1.5" />
            Export PCAP
          </button>
          <button className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-md flex items-center">
            <RefreshCcw className="h-4 w-4 mr-1.5" />
            Live Capture
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Top Protocols</h3>
          <div className="space-y-2">
            {[
              { protocol: 'TCP', count: 1245, percentage: 60 },
              { protocol: 'UDP', count: 432, percentage: 20 },
              { protocol: 'HTTP', count: 256, percentage: 12 },
              { protocol: 'DNS', count: 128, percentage: 6 },
              { protocol: 'ICMP', count: 48, percentage: 2 }
            ].map((item) => (
              <div key={item.protocol}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white">{item.protocol}</span>
                  <span className="text-gray-400">{item.count} packets</span>
                </div>
                <div className="w-full bg-dark-600 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      item.protocol === 'TCP' ? 'bg-primary-500' :
                      item.protocol === 'UDP' ? 'bg-secondary-500' :
                      item.protocol === 'HTTP' ? 'bg-success-500' :
                      item.protocol === 'DNS' ? 'bg-warning-500' :
                      'bg-error-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-dark-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Top Source IPs</h3>
          <div className="space-y-2">
            {[
              { ip: '192.168.1.105', count: 853, percentage: 45 },
              { ip: '10.0.0.15', count: 421, percentage: 22 },
              { ip: '10.0.0.1', count: 312, percentage: 16 },
              { ip: '45.33.32.156', count: 195, percentage: 10 },
              { ip: '198.51.100.23', count: 142, percentage: 7 }
            ].map((item) => (
              <div key={item.ip}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white">{item.ip}</span>
                  <span className="text-gray-400">{item.count} packets</span>
                </div>
                <div className="w-full bg-dark-600 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-primary-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-dark-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Top Destination IPs</h3>
          <div className="space-y-2">
            {[
              { ip: '93.184.216.34', count: 756, percentage: 38 },
              { ip: '10.0.0.1', count: 532, percentage: 27 },
              { ip: '10.0.0.15', count: 298, percentage: 15 },
              { ip: '198.51.100.23', count: 243, percentage: 12 },
              { ip: '45.33.32.156', count: 156, percentage: 8 }
            ].map((item) => (
              <div key={item.ip}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white">{item.ip}</span>
                  <span className="text-gray-400">{item.count} packets</span>
                </div>
                <div className="w-full bg-dark-600 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-secondary-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-dark-800 rounded-lg p-4">
        <h3 className="text-base font-medium text-white mb-4">Packet Analysis</h3>
        <PacketTable packets={mockPackets} />
      </div>
    </motion.div>
  );
};

export default NetworkTraffic;