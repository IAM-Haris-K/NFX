// Network Traffic Types
export interface NetworkPacket {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  protocol: string;
  size: number;
  info: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  flagged?: boolean;
  payload?: string;
  headers?: Record<string, string>;
}

export interface TrafficData {
  timestamp: string;
  value: number;
  protocol?: string;
}

// Alert and Event Types
export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  sourceIp?: string;
  destinationIp?: string;
  status: 'new' | 'investigating' | 'resolved' | 'dismissed';
  category: string;
  relatedEvents?: string[];
  assignedTo?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'alert' | 'system' | 'user' | 'network';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  icon?: string;
}

// Threat Intelligence Types
export interface ThreatIntelligence {
  id: string;
  indicator: string;
  type: 'ip' | 'domain' | 'url' | 'file' | 'email';
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  source: string;
  timestamp: string;
  tags: string[];
}

// Dashboard Types
export interface DashboardSummary {
  totalAlerts: number;
  criticalAlerts: number;
  packetsAnalyzed: number;
  threatDetections: number;
  systemStatus: 'healthy' | 'degraded' | 'critical';
}

// User Interface Types
export interface NavItem {
  name: string;
  path: string;
  icon: string;
}

export interface Tab {
  id: string;
  label: string;
}