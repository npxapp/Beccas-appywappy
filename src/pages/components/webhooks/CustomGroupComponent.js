import React, { useEffect, useState, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const CustomGroupComponent = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/spans');
      const data = await response.json();

      const serviceMap = new Map();
      const links = [];

      // First collect all services (from both main services and their connections)
      data.forEach(item => {
        const { traceID, from, to, serviceName } = item;
        
        // Add main service
        if (!serviceMap.has(serviceName)) {
          serviceMap.set(serviceName, { traceIDs: [] });
        }
        serviceMap.get(serviceName).traceIDs.push(traceID);

        // Add services from 'from' array
        from.forEach(sourceService => {
          if (!serviceMap.has(sourceService)) {
            serviceMap.set(sourceService, { traceIDs: [] });
          }
        });

        // Add services from 'to' array
        to.forEach(targetService => {
          if (!serviceMap.has(targetService)) {
            serviceMap.set(targetService, { traceIDs: [] });
          }
        });
      });

      // Calculate circular positions
      const totalServices = serviceMap.size;
      const radius = 200;
      const centerX = 0;
      const centerY = 0;
      
      let index = 0;
      serviceMap.forEach((value, service) => {
        const angle = (index / totalServices) * 2 * Math.PI;
        value.x = centerX + radius * Math.cos(angle);
        value.y = centerY + radius * Math.sin(angle);
        index++;
      });

      // Create links AFTER all services are registered
      data.forEach(item => {
        const { from, to, serviceName } = item;
        
        from.forEach(sourceService => {
          if (serviceMap.has(sourceService) && serviceMap.has(serviceName)) {
            links.push({
              source: sourceService,
              target: serviceName,
              isForward: true
            });
          }
        });
        
        to.forEach(targetService => {
          if (serviceMap.has(serviceName) && serviceMap.has(targetService)) {
            links.push({
              source: serviceName,
              target: targetService,
              isForward: false
            });
          }
        });
      });

      // Convert serviceMap to nodes array
      const nodes = Array.from(serviceMap.entries()).map(([serviceName, data]) => ({
        id: serviceName,
        traceIDs: data.traceIDs,
        x: data.x,
        y: data.y,
        fx: data.x,
        fy: data.y,
      }));

      setGraphData({ nodes, links });
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    if (fgRef.current && graphData.nodes.length > 0) {
      fgRef.current.zoomToFit(400, 10);
    }
  }, [graphData]);

  return (
    <div style={{ width: '100%', height: '600px', }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        height={600}
        nodeColor="#8884d8"
        nodeRelSize={8}
        linkColor="#8884d8"
        linkOpacity={0.3}
        linkCurvature={0}
        d3Force={{
          center: null,
          charge: null,
          link: null
        }}
        enableNodeDrag={false}
        enableZoom={false}
        nodeCanvasObject={(node, ctx, globalScale) => {
          // Draw node
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
          ctx.fillStyle = '#8884d8';
          ctx.fill();

          // Draw label
          const label = node.id;
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillStyle = '#8884d8';
          ctx.fillText(label, node.x, node.y - 12);
        }}
        linkCanvasObject={(link, ctx) => {
          const sourceNode = link.source;
          const targetNode = link.target;
          
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const angle = Math.atan2(dy, dx);
          
          const nodeRadius = 8;
          const startX = sourceNode.x + nodeRadius * Math.cos(angle);
          const startY = sourceNode.y + nodeRadius * Math.sin(angle);
          const endX = targetNode.x - nodeRadius * Math.cos(angle);
          const endY = targetNode.y - nodeRadius * Math.sin(angle);
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = '#8884d8';
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.3;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }}
      />
    </div>
  );
};

export default CustomGroupComponent;