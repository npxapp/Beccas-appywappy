import React, { useState, useEffect } from 'react';
import Webhook from '@mui/icons-material/Webhook';
import History from '@mui/icons-material/History';
import MonitorHeart from '@mui/icons-material/MonitorHeart';
import Timeline from '@mui/icons-material/Timeline';
import AccountTree from '@mui/icons-material/AccountTree';
import Hub from '@mui/icons-material/Hub';
import PrecisionManufacturing from '@mui/icons-material/PrecisionManufacturing';
import SmartToy from '@mui/icons-material/SmartToy';
import Engineering from '@mui/icons-material/Engineering';
import Architecture from '@mui/icons-material/Architecture';
import GrainIcon from '@mui/icons-material/Grain';
import GroupsIcon from '@mui/icons-material/Groups';
import SmsIcon from '@mui/icons-material/Sms';
import ApiIcon from '@mui/icons-material/Api';
import { useDarkMode } from '../contexts/DarkMode';
import { createStyles } from './parts/CreateStyles';

// Mock data for different tabs
const webhookData = [
  { endpoint: 'https://api.example.com/webhook1', events: ['deployment', 'error'] },
  { endpoint: 'https://api.example.com/webhook2', events: ['monitoring', 'alert'] }
];

const traceData = {
  nodeEdge: { nodes: 15, edges: 25, complexity: 'medium' },
  node: { totalNodes: 42, activeNodes: 38, health: 'good' },
  nodeTrace: { traces: 150, avgDuration: '120ms', status: 'normal' },
  nodeEnds: { endpoints: 8, failures: 2, success: '75%' }
};

const uptimeData = [
  { service: 'API Gateway', uptime: '99.99%', robot: PrecisionManufacturing },
  { service: 'Database Cluster', uptime: '99.95%', robot: SmartToy },
  { service: 'Cache Layer', uptime: '99.90%', robot: Engineering }
];

const GraphData = [
  { metric: 'CPU Usage', value: '70%', icon: Hub },
  { metric: 'Memory Usage', value: '85%', icon: MonitorHeart },
  { metric: 'Disk Usage', value: '65%', icon: Timeline }
];

const GroupData = [
  { groupName: 'Admins', members: 4 },
  { groupName: 'Developers', members: 10 },
  { groupName: 'Support', members: 5 }
];

const SmsData = [
  { message: 'Service down alert', status: 'Sent', time: '10 mins ago' },
  { message: 'High CPU usage alert', status: 'Sent', time: '20 mins ago' }
];

const ApiData = [
  { apiName: 'User Service', status: 'Active', endpoint: '/api/users' },
  { apiName: 'Order Service', status: 'Active', endpoint: '/api/orders' },
  { apiName: 'Product Service', status: 'Maintenance', endpoint: '/api/products' }
];

const DemoDashboardPro = () => {
  const { darkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState('View');
  const tabs = ['Overview', 'Graphs', 'Hooks', 'Spans', 'UpTime', 'Groups', 'Sms Alerts', 'Apis'];

  useEffect(() => {
    const existingStyle = document.getElementById('demo-pro-styles');
    if (existingStyle) existingStyle.remove();
    document.head.appendChild(createStyles(darkMode));
    return () => {
      const style = document.getElementById('demo-pro-styles');
      if (style) style.remove();
    };
  }, [darkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Graphs':
        return (
          <div>
            {GraphData.map((graph, index) => {
              const GraphIcon = graph.icon;
              return (
                <div key={index} className="demo-pro-trace-container">
                  <GraphIcon className="demo-pro-icon" />
                  <h3>{graph.metric}</h3>
                  <p>Current: {graph.value}</p>
                </div>
              );
            })}
          </div>
        );
      case 'Groups':
        return (
          <div>
            {GroupData.map((group, index) => (
              <div key={index} className="demo-pro-trace-container">
                <GroupsIcon className="demo-pro-icon" />
                <h3>{group.groupName}</h3>
                <p>Members: {group.members}</p>
              </div>
            ))}
          </div>
        );
      case 'Sms Alerts':
        return (
          <div>
            {SmsData.map((sms, index) => (
              <div key={index} className="demo-pro-trace-container">
                <SmsIcon className="demo-pro-icon" />
                <h3>{sms.message}</h3>
                <p>Status: {sms.status} - {sms.time}</p>
              </div>
            ))}
          </div>
        );
      case 'Apis':
        return (
          <div>
            {ApiData.map((api, index) => (
              <div key={index} className="demo-pro-trace-container">
                <ApiIcon className="demo-pro-icon" />
                <h3>{api.apiName}</h3>
                <p>Endpoint: {api.endpoint} - Status: {api.status}</p>
              </div>
            ))}
          </div>
        );
      case 'Hooks':
        return (
          <div>
            {webhookData.map((webhook, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="demo-pro-webhook-input"
                  defaultValue={webhook.endpoint}
                  placeholder="Enter webhook URL"
                />
                <input
                  type="text"
                  className="demo-pro-webhook-input"
                  defaultValue={webhook.events.join(', ')}
                  placeholder="Enter event types"
                />
              </div>
            ))}
          </div>
        );
      case 'Spans':
        return (
          <div>
            <div className="demo-pro-trace-container">
              <h3>NodeEdge Graph</h3>
              <Timeline className="demo-pro-icon" />
              <div>Nodes: {traceData.nodeEdge.nodes} | Edges: {traceData.nodeEdge.edges}</div>
            </div>
            <div className="demo-pro-trace-container">
              <h3>NodeGraph</h3>
              <AccountTree className="demo-pro-icon" />
              <div>Total: {traceData.node.totalNodes} | Active: {traceData.node.activeNodes}</div>
            </div>
            <div className="demo-pro-trace-container">
              <h3>NodeTrace</h3>
              <History className="demo-pro-icon" />
              <div>Traces: {traceData.nodeTrace.traces} | Duration: {traceData.nodeTrace.avgDuration}</div>
            </div>
            <div className="demo-pro-trace-container">
              <h3>NodeEnds</h3>
              <Architecture className="demo-pro-icon" />
              <div>Endpoints: {traceData.nodeEnds.endpoints} | Success Rate: {traceData.nodeEnds.success}</div>
            </div>
          </div>
        );
      case 'UpTime':
        return (
          <div>
            {uptimeData.map((service, index) => {
              const RobotIcon = service.robot;
              return (
                <div key={index} className="demo-pro-uptime-card">
                  <RobotIcon className="demo-pro-robot-icon" />
                  <div>
                    <h3>{service.service}</h3>
                    <div>Uptime: {service.uptime}</div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      default:
        return <div>View content (using existing Overview layout)</div>;
    }
  };

  return (
    <div className="demo-pro-container">
      <nav>
        <div className="demo-pro-tabList">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`demo-pro-tab ${activeTab === tab ? 'demo-pro-activeTab' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Hooks' && <Webhook className="demo-pro-icon" />}
              {tab === 'Spans' && <GrainIcon className="demo-pro-icon" />}
              {tab === 'UpTime' && <MonitorHeart className="demo-pro-icon" />}
              {tab === 'Graphs' && <Hub className="demo-pro-icon" />}
              {tab === 'Groups' && <GroupsIcon className="demo-pro-icon" />}
              {tab === 'Sms Alerts' && <SmsIcon className="demo-pro-icon" />}
              {tab === 'Apis' && <ApiIcon className="demo-pro-icon" />}
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main>{renderContent()}</main>
    </div>
  );
};

export default DemoDashboardPro;