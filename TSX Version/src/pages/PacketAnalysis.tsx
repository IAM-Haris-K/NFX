import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, ChevronRight, ChevronDown, ExternalLink, Copy, Download } from 'lucide-react';
import { mockPackets } from '../data/mockData';

const PacketAnalysis: React.FC = () => {
  const [selectedPacket, setSelectedPacket] = useState(mockPackets[0]);
  const [expandedSections, setExpandedSections] = useState({
    headers: true,
    payload: false,
    hexDump: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Mock packet headers for selected packet
  const packetHeaders = {
    'Ethernet': {
      'Destination': '00:1a:2b:3c:4d:5e',
      'Source': '00:5e:4d:3c:2b:1a',
      'Type': 'IPv4 (0x0800)'
    },
    'Internet Protocol Version 4': {
      'Version': '4',
      'Header Length': '20 bytes',
      'Differentiated Services Field': '0x00',
      'Total Length': '576',
      'Identification': '0x1234 (4660)',
      'Flags': '0x02 (Don\'t Fragment)',
      'Fragment Offset': '0',
      'Time to Live': '64',
      'Protocol': 'TCP (6)',
      'Header Checksum': '0x1a2b',
      'Source Address': selectedPacket.sourceIp,
      'Destination Address': selectedPacket.destinationIp
    },
    'Transmission Control Protocol': {
      'Source Port': '54321',
      'Destination Port': '443',
      'Sequence Number': '1234567890',
      'Acknowledgment Number': '0',
      'Header Length': '32 bytes',
      'Flags': 'SYN',
      'Window Size': '64240',
      'Checksum': '0x3a4b',
      'Urgent Pointer': '0',
      'Options': 'Maximum segment size: 1460 bytes'
    }
  };

  // Mock hex dump data
  const hexDumpData = `0000   00 1a 2b 3c 4d 5e 00 5e 4d 3c 2b 1a 08 00 45 00   ..+<M^.^M<+...E.
0010   02 40 12 34 40 00 40 06 1a 2b c0 a8 01 69 5d b8   .@.4@.@..+...i].
0020   d8 22 d4 31 01 bb 49 a5 c6 b2 00 00 00 00 80 02   .".1..I.........
0030   fa f0 3a 4b 00 00 02 04 05 b4 01 03 03 08 01 01   ..:K............
0040   04 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00   ................`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <FileSearch className="mr-2 h-6 w-6 text-primary-500" />
          Packet Analysis
        </h1>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-white text-sm rounded-md flex items-center">
            <Download className="h-4 w-4 mr-1.5" />
            Download PCAP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Packet List */}
        <div className="bg-dark-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-dark-700">
            <h2 className="text-lg font-semibold text-white">Packet List</h2>
          </div>
          
          <div className="overflow-y-auto max-h-[600px]">
            {mockPackets.map((packet) => (
              <div
                key={packet.id}
                className={`p-3 border-b border-dark-700 cursor-pointer hover:bg-dark-700/50 transition-colors ${
                  selectedPacket.id === packet.id ? 'bg-dark-700' : ''
                }`}
                onClick={() => setSelectedPacket(packet)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        packet.protocol === 'TCP' ? 'bg-primary-600/10 text-primary-400' :
                        packet.protocol === 'UDP' ? 'bg-secondary-600/10 text-secondary-400' :
                        packet.protocol === 'HTTP' ? 'bg-success-600/10 text-success-400' :
                        packet.protocol === 'DNS' ? 'bg-warning-600/10 text-warning-400' :
                        'bg-gray-600/10 text-gray-400'
                      }`}>
                        {packet.protocol}
                      </span>
                      {packet.severity && (
                        <span className={`ml-2 inline-block w-2 h-2 rounded-full ${
                          packet.severity === 'critical' ? 'bg-error-600' :
                          packet.severity === 'high' ? 'bg-error-500' :
                          packet.severity === 'medium' ? 'bg-warning-500' :
                          'bg-success-500'
                        }`} />
                      )}
                    </div>
                    <div className="mt-1 text-xs text-gray-300 flex items-center space-x-1">
                      <span>{packet.sourceIp}</span>
                      <ChevronRight className="h-3 w-3" />
                      <span>{packet.destinationIp}</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 truncate">
                      {packet.info}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(packet.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packet Details */}
        <div className="lg:col-span-2 bg-dark-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-dark-700">
            <h2 className="text-lg font-semibold text-white">Packet Details</h2>
            <div className="mt-1 flex items-center text-sm text-gray-400">
              <span>{selectedPacket.sourceIp}</span>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>{selectedPacket.destinationIp}</span>
              <span className="mx-2">•</span>
              <span>{selectedPacket.protocol}</span>
              <span className="mx-2">•</span>
              <span>{selectedPacket.size} bytes</span>
            </div>
          </div>
          
          <div className="p-4 overflow-y-auto max-h-[600px] font-mono text-sm">
            {/* Protocol Headers */}
            <div>
              <div 
                className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-dark-700"
                onClick={() => toggleSection('headers')}
              >
                <h3 className="text-white font-medium">Protocol Headers</h3>
                {expandedSections.headers ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              
              {expandedSections.headers && (
                <div className="pl-4 pb-4">
                  {Object.entries(packetHeaders).map(([protocol, fields]) => (
                    <div key={protocol} className="mt-3">
                      <h4 className="text-primary-400 border-b border-dark-600 pb-1">{protocol}</h4>
                      <div className="pl-4 mt-1 space-y-1">
                        {Object.entries(fields).map(([field, value]) => (
                          <div key={field} className="flex">
                            <span className="text-gray-400 w-40">{field}:</span>
                            <span className="text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Payload Data */}
            <div className="mt-4 border-t border-dark-600 pt-4">
              <div 
                className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-dark-700"
                onClick={() => toggleSection('payload')}
              >
                <h3 className="text-white font-medium">Payload Data</h3>
                {expandedSections.payload ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              
              {expandedSections.payload && (
                <div className="pl-4 pb-4 overflow-x-auto">
                  <div className="flex justify-end space-x-2 mb-2">
                    <button className="p-1 rounded hover:bg-dark-600 text-gray-400">
                      <Copy size={14} />
                    </button>
                    <button className="p-1 rounded hover:bg-dark-600 text-gray-400">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                  <div className="bg-dark-900 p-3 rounded text-green-400 whitespace-pre">
                    {"GET /index.html HTTP/1.1\r\n"}
                    {"Host: example.com\r\n"}
                    {"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\n"}
                    {"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\n"}
                    {"Accept-Language: en-US,en;q=0.5\r\n"}
                    {"Accept-Encoding: gzip, deflate, br\r\n"}
                    {"Connection: keep-alive\r\n"}
                    {"Upgrade-Insecure-Requests: 1\r\n"}
                    {"Cache-Control: max-age=0\r\n"}
                    {"\r\n"}
                  </div>
                </div>
              )}
            </div>
            
            {/* Hex Dump */}
            <div className="mt-4 border-t border-dark-600 pt-4">
              <div 
                className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-dark-700"
                onClick={() => toggleSection('hexDump')}
              >
                <h3 className="text-white font-medium">Hex Dump</h3>
                {expandedSections.hexDump ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              
              {expandedSections.hexDump && (
                <div className="pl-4 pb-4 overflow-x-auto">
                  <div className="flex justify-end space-x-2 mb-2">
                    <button className="p-1 rounded hover:bg-dark-600 text-gray-400">
                      <Copy size={14} />
                    </button>
                  </div>
                  <div className="bg-dark-900 p-3 rounded text-gray-300 whitespace-pre font-mono text-xs">
                    {hexDumpData}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PacketAnalysis;