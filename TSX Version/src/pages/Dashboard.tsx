import React from 'react';
import { motion } from 'framer-motion';
import { ParentSize } from '@visx/responsive';
import { 
  BarChart3, 
  AlertTriangle, 
  ShieldCheck, 
  Activity,
  ServerCrash
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import AlertsList from '../components/dashboard/AlertsList';
import NetworkTrafficChart from '../components/dashboard/NetworkTrafficChart';
import TimelineEvents from '../components/dashboard/TimelineEvents';
import PacketTable from '../components/dashboard/PacketTable';
import SecurityMap from '../components/network/SecurityMap';
import { 
  mockAlerts, 
  mockTimelineEvents, 
  mockPackets,
  mockDashboardSummary,
  weeklyTrafficData
} from '../data/mockData';

const Dashboard: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Security Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Last updated: Just now</span>
          <button className="p-1 rounded-full hover:bg-dark-700">
            <Activity className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Alerts"
          value={mockDashboardSummary.totalAlerts}
          icon={<AlertTriangle size={20} />}
          change={{ value: 12, direction: 'up' }}
          color="primary"
        />
        <StatCard
          title="Critical Alerts"
          value={mockDashboardSummary.criticalAlerts}
          icon={<ServerCrash size={20} />}
          change={{ value: 50, direction: 'up' }}
          color="error"
        />
        <StatCard
          title="Packets Analyzed"
          value={mockDashboardSummary.packetsAnalyzed.toLocaleString()}
          icon={<BarChart3 size={20} />}
          change={{ value: 8, direction: 'up' }}
          color="secondary"
        />
        <StatCard
          title="Threat Detections"
          value={mockDashboardSummary.threatDetections}
          icon={<ShieldCheck size={20} />}
          change={{ value: 5, direction: 'down' }}
          color="success"
        />
      </motion.div>

      {/* Network Traffic Chart */}
      <motion.div variants={itemVariants}>
        <ParentSize>
          {({ width }) => (
            <NetworkTrafficChart 
              data={weeklyTrafficData} 
              width={width} 
              height={300} 
            />
          )}
        </ParentSize>
      </motion.div>

      {/* Security Map and Alerts */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SecurityMap />
        <AlertsList alerts={mockAlerts} />
      </motion.div>

      {/* Timeline and Recent Packets */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TimelineEvents events={mockTimelineEvents} />
        </div>
        <div className="lg:col-span-2">
          <PacketTable packets={mockPackets} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;