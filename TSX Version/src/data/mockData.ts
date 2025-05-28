import { 
  NetworkPacket, 
  SecurityAlert, 
  TimelineEvent, 
  TrafficData,
  ThreatIntelligence,
  DashboardSummary
} from '../types';
import { addHours, subHours, subDays, format } from 'date-fns';

// Helper to generate timestamp in the past
const getTimestamp = (hoursAgo: number): string => {
  return format(subHours(new Date(), hoursAgo), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
};

// Mock Network Packets
export const mockPackets: NetworkPacket[] = [
  {
    id: 'pkt-001',
    timestamp: getTimestamp(0.1),
    sourceIp: '192.168.1.105',
    destinationIp: '93.184.216.34',
    protocol: 'TCP',
    size: 1420,
    info: 'SYN, Seq=0 Win=64240 Len=0 MSS=1460 WS=256 SACK_PERM=1',
    severity: 'low',
    flagged: false,
  },
  {
    id: 'pkt-002',
    timestamp: getTimestamp(0.2),
    sourceIp: '10.0.0.15',
    destinationIp: '10.0.0.1',
    protocol: 'DNS',
    size: 74,
    info: 'Standard query 0x1a2b A example.com',
    severity: 'low',
    flagged: false,
  },
  {
    id: 'pkt-003',
    timestamp: getTimestamp(0.3),
    sourceIp: '10.0.0.1',
    destinationIp: '10.0.0.15',
    protocol: 'DNS',
    size: 90,
    info: 'Standard query response 0x1a2b A example.com A 93.184.216.34',
    severity: 'low',
    flagged: false,
  },
  {
    id: 'pkt-004',
    timestamp: getTimestamp(0.4),
    sourceIp: '192.168.1.105',
    destinationIp: '93.184.216.34',
    protocol: 'HTTP',
    size: 567,
    info: 'GET /index.html HTTP/1.1',
    severity: 'low',
    flagged: false,
  },
  {
    id: 'pkt-005',
    timestamp: getTimestamp(0.5),
    sourceIp: '93.184.216.34',
    destinationIp: '192.168.1.105',
    protocol: 'HTTP',
    size: 1270,
    info: 'HTTP/1.1 200 OK (text/html)',
    severity: 'low',
    flagged: false,
  },
  {
    id: 'pkt-006',
    timestamp: getTimestamp(0.6),
    sourceIp: '10.0.0.15',
    destinationIp: '198.51.100.23',
    protocol: 'TCP',
    size: 52,
    info: 'SYN, Seq=0 Win=64240 Len=0 MSS=1460',
    severity: 'medium',
    flagged: true,
  },
  {
    id: 'pkt-007',
    timestamp: getTimestamp(0.7),
    sourceIp: '198.51.100.23',
    destinationIp: '10.0.0.15',
    protocol: 'TCP',
    size: 52,
    info: 'SYN, ACK Seq=0 Ack=1 Win=65535 Len=0',
    severity: 'medium',
    flagged: true,
  },
  {
    id: 'pkt-008',
    timestamp: getTimestamp(0.8),
    sourceIp: '10.0.0.15',
    destinationIp: '198.51.100.23',
    protocol: 'TLSv1.2',
    size: 150,
    info: 'Client Hello',
    severity: 'medium',
    flagged: true,
  },
  {
    id: 'pkt-009',
    timestamp: getTimestamp(0.9),
    sourceIp: '45.33.32.156',
    destinationIp: '10.0.0.1',
    protocol: 'SSH',
    size: 98,
    info: 'SSH Protocol, len: 44',
    severity: 'high',
    flagged: true,
  },
  {
    id: 'pkt-010',
    timestamp: getTimestamp(1.0),
    sourceIp: '10.0.0.1',
    destinationIp: '45.33.32.156',
    protocol: 'SSH',
    size: 66,
    info: 'SSH Protocol, len: 12',
    severity: 'high',
    flagged: true,
  },
];

// Mock Security Alerts
export const mockAlerts: SecurityAlert[] = [
  {
    id: 'alert-001',
    title: 'Potential SSH Brute Force Attack',
    description: 'Multiple failed SSH login attempts detected from IP 45.33.32.156',
    timestamp: getTimestamp(1.5),
    severity: 'high',
    sourceIp: '45.33.32.156',
    destinationIp: '10.0.0.1',
    status: 'new',
    category: 'Brute Force'
  },
  {
    id: 'alert-002',
    title: 'Suspicious Outbound Connection',
    description: 'Connection to known malicious IP address 198.51.100.23',
    timestamp: getTimestamp(2.5),
    severity: 'critical',
    sourceIp: '10.0.0.15',
    destinationIp: '198.51.100.23',
    status: 'investigating',
    category: 'Malicious Connection'
  },
  {
    id: 'alert-003',
    title: 'Unusual DNS Query Pattern',
    description: 'Host 10.0.0.15 is making DNS queries with abnormal frequency',
    timestamp: getTimestamp(4),
    severity: 'medium',
    sourceIp: '10.0.0.15',
    destinationIp: '10.0.0.1',
    status: 'new',
    category: 'DNS Anomaly'
  },
  {
    id: 'alert-004',
    title: 'Data Exfiltration Attempt',
    description: 'Large upload to external server detected',
    timestamp: getTimestamp(5),
    severity: 'critical',
    sourceIp: '192.168.1.110',
    destinationIp: '203.0.113.100',
    status: 'investigating',
    category: 'Data Exfiltration'
  },
  {
    id: 'alert-005',
    title: 'Port Scanning Activity',
    description: 'Sequential port scanning detected from external IP',
    timestamp: getTimestamp(6),
    severity: 'medium',
    sourceIp: '198.51.100.75',
    destinationIp: '10.0.0.1',
    status: 'new',
    category: 'Reconnaissance'
  }
];

// Mock Timeline Events
export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'event-001',
    title: 'System Started Packet Capture',
    description: 'Packet capture service initialized on interface eth0',
    timestamp: getTimestamp(24),
    type: 'system',
  },
  {
    id: 'event-002',
    title: 'User Login',
    description: 'Administrator logged in from 192.168.1.100',
    timestamp: getTimestamp(23),
    type: 'user',
  },
  {
    id: 'event-003',
    title: 'Alert Rule Modified',
    description: 'SSH brute force detection rule sensitivity increased',
    timestamp: getTimestamp(22),
    type: 'user',
  },
  {
    id: 'event-004',
    title: 'Potential SSH Brute Force Attack',
    description: 'Multiple failed SSH login attempts detected',
    timestamp: getTimestamp(8),
    type: 'alert',
    severity: 'high',
  },
  {
    id: 'event-005',
    title: 'Connection to Malicious IP',
    description: 'Host connected to known malicious IP address',
    timestamp: getTimestamp(7),
    type: 'alert',
    severity: 'critical',
  },
  {
    id: 'event-006',
    title: 'Unusual Network Traffic Pattern',
    description: 'Abnormal traffic pattern detected on internal network',
    timestamp: getTimestamp(5),
    type: 'network',
  },
  {
    id: 'event-007',
    title: 'System Updated Threat Intelligence',
    description: 'Threat intelligence feed updated with 156 new indicators',
    timestamp: getTimestamp(4),
    type: 'system',
  },
  {
    id: 'event-008',
    title: 'Alert Investigated',
    description: 'Administrator marked SSH brute force alert as investigating',
    timestamp: getTimestamp(3),
    type: 'user',
  },
  {
    id: 'event-009',
    title: 'Data Exfiltration Attempt',
    description: 'Large upload to external server detected',
    timestamp: getTimestamp(2),
    type: 'alert',
    severity: 'critical',
  },
  {
    id: 'event-010',
    title: 'System Resource Warning',
    description: 'Elasticsearch cluster showing high CPU usage',
    timestamp: getTimestamp(1),
    type: 'system',
  }
];

// Generate network traffic data points for the last 24 hours
export const generateTrafficData = (): TrafficData[] => {
  const data: TrafficData[] = [];
  const now = new Date();
  const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS', 'ICMP'];
  
  for (let i = 24; i >= 0; i--) {
    const timestamp = format(subHours(now, i), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    const baseValue = 100 + Math.random() * 300;
    
    // Add spike around 6 hours ago
    const spikeMultiplier = Math.abs(i - 6) < 2 ? 3 : 1;
    
    // Add protocol-specific entries
    protocols.forEach(protocol => {
      const protocolFactor = protocol === 'TCP' ? 1 :
                           protocol === 'UDP' ? 0.7 :
                           protocol === 'HTTP' ? 0.5 :
                           protocol === 'HTTPS' ? 0.8 :
                           protocol === 'DNS' ? 0.3 : 0.1;
      
      data.push({
        timestamp,
        value: Math.round(baseValue * protocolFactor * spikeMultiplier * (0.8 + Math.random() * 0.4)),
        protocol
      });
    });
  }
  
  return data;
};

// Mock Threat Intelligence
export const mockThreatIntelligence: ThreatIntelligence[] = [
  {
    id: 'threat-001',
    indicator: '198.51.100.23',
    type: 'ip',
    confidence: 85,
    severity: 'high',
    description: 'Known command and control server for Emotet botnet',
    source: 'AlienVault OTX',
    timestamp: getTimestamp(48),
    tags: ['botnet', 'emotet', 'c2']
  },
  {
    id: 'threat-002',
    indicator: 'malware-distribution.example.com',
    type: 'domain',
    confidence: 90,
    severity: 'critical',
    description: 'Domain associated with malware distribution',
    source: 'VirusTotal',
    timestamp: getTimestamp(36),
    tags: ['malware', 'phishing']
  },
  {
    id: 'threat-003',
    indicator: 'hxxp://malicious-site.example/payload.exe',
    type: 'url',
    confidence: 95,
    severity: 'critical',
    description: 'URL hosting ransomware payload',
    source: 'Recorded Future',
    timestamp: getTimestamp(24),
    tags: ['ransomware', 'payload']
  },
  {
    id: 'threat-004',
    indicator: '44d88612fea8a8f36de82e1278abb02f',
    type: 'file',
    confidence: 100,
    severity: 'critical',
    description: 'MD5 hash of WannaCry ransomware sample',
    source: 'MISP',
    timestamp: getTimestamp(12),
    tags: ['wannacry', 'ransomware']
  },
  {
    id: 'threat-005',
    indicator: 'phishing@malicious-domain.example',
    type: 'email',
    confidence: 75,
    severity: 'medium',
    description: 'Email address used in phishing campaigns',
    source: 'PhishTank',
    timestamp: getTimestamp(6),
    tags: ['phishing', 'campaign']
  }
];

// Mock Dashboard Summary
export const mockDashboardSummary: DashboardSummary = {
  totalAlerts: 27,
  criticalAlerts: 3,
  packetsAnalyzed: 1458932,
  threatDetections: 42,
  systemStatus: 'healthy'
};

// Generate hourly traffic data for the past 7 days
export const generateWeeklyTrafficData = (): { date: string; value: number }[] => {
  const data: { date: string; value: number }[] = [];
  const now = new Date();
  
  for (let i = 0; i < 7 * 24; i++) {
    const date = format(subHours(now, i), "yyyy-MM-dd'T'HH:mm:ss");
    const baseValue = 2000 + Math.random() * 8000;
    
    // Create daily patterns with lower traffic at night
    const hour = new Date(date).getHours();
    const hourlyFactor = 
      hour >= 9 && hour <= 17 ? 1.0 :  // Business hours
      hour >= 6 && hour <= 8 ? 0.7 :   // Morning
      hour >= 18 && hour <= 22 ? 0.6 : // Evening
      0.2;                            // Night
    
    // Create weekly pattern with lower traffic on weekends
    const day = new Date(date).getDay();
    const weekdayFactor = (day === 0 || day === 6) ? 0.5 : 1.0;
    
    data.push({
      date,
      value: Math.round(baseValue * hourlyFactor * weekdayFactor * (0.8 + Math.random() * 0.4))
    });
  }
  
  return data;
};

// Pre-generate traffic data
export const trafficData = generateTrafficData();
export const weeklyTrafficData = generateWeeklyTrafficData();