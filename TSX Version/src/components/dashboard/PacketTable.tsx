import React, { useState } from 'react';
import { NetworkPacket } from '../../types';
import { Eye, Flag, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';

interface PacketTableProps {
  packets: NetworkPacket[];
}

const PacketTable: React.FC<PacketTableProps> = ({ packets }) => {
  const [sort, setSort] = useState({ field: 'timestamp', direction: 'desc' });
  const [filter, setFilter] = useState('');

  // Sort packets
  const sortedPackets = [...packets].sort((a, b) => {
    const fieldA = a[sort.field as keyof NetworkPacket];
    const fieldB = b[sort.field as keyof NetworkPacket];
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sort.direction === 'asc' 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    }
    
    return 0;
  });

  // Filter packets
  const filteredPackets = filter 
    ? sortedPackets.filter(packet => 
        packet.sourceIp.includes(filter) || 
        packet.destinationIp.includes(filter) ||
        packet.protocol.toLowerCase().includes(filter.toLowerCase()) ||
        packet.info.toLowerCase().includes(filter.toLowerCase())
      )
    : sortedPackets;

  // Function to handle sorting
  const handleSort = (field: string) => {
    setSort(prevSort => ({
      field,
      direction: prevSort.field === field && prevSort.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Function to get severity class
  const getSeverityClass = (severity?: string) => {
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
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });
  };

  return (
    <div className="bg-dark-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-dark-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Recent Packets</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter packets..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-8 pr-4 py-1 text-sm bg-dark-600 border border-dark-500 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-white"
            />
            <Filter size={14} className="absolute left-2.5 top-2 text-gray-400" />
          </div>
          <button className="p-1 bg-dark-600 rounded-md hover:bg-dark-500">
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-600">
          <thead className="bg-dark-700">
            <tr>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center">
                  Time
                  {sort.field === 'timestamp' && (
                    <ArrowUpDown size={12} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('sourceIp')}
              >
                <div className="flex items-center">
                  Source
                  {sort.field === 'sourceIp' && (
                    <ArrowUpDown size={12} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('destinationIp')}
              >
                <div className="flex items-center">
                  Destination
                  {sort.field === 'destinationIp' && (
                    <ArrowUpDown size={12} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('protocol')}
              >
                <div className="flex items-center">
                  Protocol
                  {sort.field === 'protocol' && (
                    <ArrowUpDown size={12} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('size')}
              >
                <div className="flex items-center">
                  Size
                  {sort.field === 'size' && (
                    <ArrowUpDown size={12} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Info
              </th>
              <th scope="col" className="relative px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark-800 divide-y divide-dark-700">
            {filteredPackets.map((packet) => (
              <tr key={packet.id} className="hover:bg-dark-700/50 transition-colors">
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-300">
                  {formatTime(packet.timestamp)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-300">
                  {packet.sourceIp}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-300">
                  {packet.destinationIp}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    packet.protocol === 'TCP' ? 'bg-primary-600/10 text-primary-400' :
                    packet.protocol === 'UDP' ? 'bg-secondary-600/10 text-secondary-400' :
                    packet.protocol === 'HTTP' ? 'bg-success-600/10 text-success-400' :
                    packet.protocol === 'DNS' ? 'bg-warning-600/10 text-warning-400' :
                    'bg-gray-600/10 text-gray-400'
                  }`}>
                    {packet.protocol}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-300">
                  {packet.size} bytes
                </td>
                <td className="px-4 py-2 text-xs text-gray-300 truncate max-w-[200px]">
                  {packet.info}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-right text-xs font-medium">
                  <div className="flex items-center space-x-2">
                    {packet.severity && (
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        packet.severity === 'critical' ? 'bg-error-600' :
                        packet.severity === 'high' ? 'bg-error-500' :
                        packet.severity === 'medium' ? 'bg-warning-500' :
                        'bg-success-500'
                      }`} />
                    )}
                    <button className="text-gray-400 hover:text-gray-300">
                      <Eye size={14} />
                    </button>
                    <button className={`${packet.flagged ? 'text-error-500' : 'text-gray-400 hover:text-gray-300'}`}>
                      <Flag size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PacketTable;