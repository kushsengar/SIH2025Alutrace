import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Tooltip, Typography, Zoom } from '@mui/material';
import { ModelId, ModelNode, ModelStatus, MODEL_METADATA } from '../../state/aipipeline/types';

interface PipelineGraphProps {
  models: typeof MODEL_METADATA;
  activeModelId: ModelId | null;
  modelStatuses: Record<ModelId, ModelStatus>;
  onModelClick: (modelId: ModelId) => void;
}

// Define connections between models for proper flow
const CONNECTIONS: Array<[ModelId, ModelId]> = [
  // Main flow
  ['gap-filling', 'ef-selector'],
  ['ef-selector', 'surrogate-refining'],
  ['ef-selector', 'surrogate-smelting'],
  ['ef-selector', 'surrogate-recycling'],
  ['ef-selector', 'forecast-demand'],
  
  // Process to circularity
  ['surrogate-refining', 'circularity'],
  ['surrogate-smelting', 'circularity'],
  ['surrogate-recycling', 'circularity'],
  
  // Circularity to optimization
  ['circularity', 'anomaly'],
  ['circularity', 'optimizer'],
  
  // Forecasting connections
  ['forecast-demand', 'optimizer'],
  ['forecast-grid', 'optimizer'],
  ['forecast-renewable', 'forecast-grid'],
  
  // Final stage
  ['anomaly', 'rag'],
  ['optimizer', 'rag'],
];

const PipelineGraph: React.FC<PipelineGraphProps> = ({
  models,
  activeModelId,
  modelStatuses,
  onModelClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredModel, setHoveredModel] = useState<ModelId | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 700 });

  // Animation loop for flow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Responsive sizing and auto-centering
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        // Set dimensions to provide proper viewport with padding
        setDimensions({ 
          width: Math.max(width, 1400), 
          height: Math.max(height, 700) 
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStatusColor = (status: ModelStatus) => {
    switch (status) {
      case 'running':
        return '#3b82f6';
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  const getNodeOpacity = (modelId: ModelId) => {
    if (hoveredModel === modelId || activeModelId === modelId) return 1;
    if (hoveredModel || activeModelId) return 0.5;
    return 0.9;
  };

  const renderConnections = () => {
    return CONNECTIONS.map(([from, to], index) => {
      const fromModel = models[from];
      const toModel = models[to];
      
      if (!fromModel || !toModel) return null;

      const fromStatus = modelStatuses[from];
      const toStatus = modelStatuses[to];
      
      // Calculate if this connection should be animated
      const isActive = fromStatus === 'success' && 
                      (toStatus === 'running' || toStatus === 'success');
      
      const strokeColor = isActive ? '#3b82f6' : '#cbd5e1';
      const strokeWidth = isActive ? 3 : 2;
      const strokeDasharray = isActive ? '8, 4' : 'none';

      // Calculate control points for curved path
      const startX = fromModel.position.x + 180;
      const startY = fromModel.position.y + 30;
      const endX = toModel.position.x;
      const endY = toModel.position.y + 30;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const midX = startX + deltaX / 2;
      const midY = startY + deltaY / 2;
      
      // Create smooth bezier curves
      let path;
      if (Math.abs(deltaY) < 10) {
        // Horizontal connection
        path = `M ${startX} ${startY} L ${endX} ${endY}`;
      } else {
        // Curved connection
        const controlX1 = startX + deltaX * 0.4;
        const controlY1 = startY;
        const controlX2 = endX - deltaX * 0.4;
        const controlY2 = endY;
        path = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
      }

      return (
        <g key={`connection-${index}`}>
          <defs>
            <marker
              id={`arrowhead-${index}`}
              markerWidth="12"
              markerHeight="12"
              refX="10"
              refY="4"
              orient="auto"
            >
              <polygon
                points="0 0, 12 4, 0 8"
                fill={strokeColor}
              />
            </marker>
            {isActive && (
              <filter id={`glow-${index}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            )}
          </defs>
          <path
            d={path}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            markerEnd={`url(#arrowhead-${index})`}
            opacity={isActive ? 1 : 0.6}
            filter={isActive ? `url(#glow-${index})` : undefined}
            style={{
              strokeDashoffset: isActive ? animationPhase : 0,
              transition: 'all 0.3s ease',
            }}
          />
        </g>
      );
    });
  };

  const renderNodes = () => {
    return Object.values(models).map((model) => {
      const status = modelStatuses[model.id] || 'idle';
      const isActive = activeModelId === model.id;
      const isHovered = hoveredModel === model.id;
      const statusColor = getStatusColor(status);
      const scale = isHovered ? 1.08 : isActive ? 1.05 : 1;

      return (
        <g
          key={model.id}
          transform={`translate(${model.position.x}, ${model.position.y})`}
          onClick={() => onModelClick(model.id)}
          onMouseEnter={() => setHoveredModel(model.id)}
          onMouseLeave={() => setHoveredModel(null)}
          style={{ cursor: 'pointer' }}
        >
          {/* Shadow and glow effect */}
          <defs>
            <filter id={`shadow-${model.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="2" dy="4" result="offsetblur"/>
              <feFlood floodColor="#000000" floodOpacity="0.15"/>
              <feComposite in2="offsetblur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id={`gradient-${model.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={model.color} stopOpacity="0.1"/>
              <stop offset="100%" stopColor={model.color} stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          
          {/* Main rectangle with gradient background */}
          <rect
            x="0"
            y="0"
            width="180"
            height="60"
            rx="12"
            fill={`url(#gradient-${model.id})`}
            stroke={isActive ? statusColor : model.color}
            strokeWidth={isActive ? 3 : 2}
            filter={`url(#shadow-${model.id})`}
            opacity={getNodeOpacity(model.id)}
            style={{
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `scale(${scale})`,
              transformOrigin: '90px 30px',
            }}
          />
          
          {/* White background for text readability */}
          <rect
            x="1"
            y="1"
            width="178"
            height="58"
            rx="11"
            fill="white"
            opacity="0.95"
          />
          
          {/* Status indicator with pulse effect */}
          <circle
            cx="160"
            cy="18"
            r="6"
            fill={statusColor}
            opacity={status !== 'idle' ? 1 : 0.3}
          >
            {status === 'running' && (
              <>
                <animate
                  attributeName="r"
                  values="4;8;4"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="1;0.5;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>
          
          {/* Icon area */}
          <rect
            x="10"
            y="10"
            width="40"
            height="40"
            rx="8"
            fill={model.color}
            opacity="0.1"
          />
          
          {/* Model title */}
          <text
            x="60"
            y="25"
            fontSize="13"
            fontWeight="600"
            fill="#1e293b"
          >
            {model.title}
          </text>
          
          {/* Category label */}
          <text
            x="60"
            y="44"
            fontSize="11"
            fill="#64748b"
          >
            {model.category}
          </text>
          
          {/* Processing animation bar for running status */}
          {status === 'running' && (
            <rect
              x="0"
              y="58"
              width="180"
              height="2"
              rx="1"
              fill={statusColor}
            >
              <animate
                attributeName="width"
                values="0;180;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
          )}
          
          {/* Success checkmark */}
          {status === 'success' && (
            <g transform="translate(25, 25)">
              <circle r="8" fill="#10b981" opacity="0.2"/>
              <path
                d="M -3 0 L -1 2 L 3 -2"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}
        </g>
      );
    });
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'auto',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '600px',
      }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 1400 700`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* Enhanced grid pattern background */}
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="25" cy="25" r="1" fill="#cbd5e1" opacity="0.5"/>
          </pattern>
          <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.3"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-gradient)" />
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.4" />
        
        {/* Centered content group */}
        <g transform="translate(50, 50)">
          {/* Render connections first (behind nodes) */}
          {renderConnections()}
          
          {/* Render model nodes */}
          {renderNodes()}
        </g>
      </svg>
      
      {/* Legend and Controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 3,
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '12px 20px',
          borderRadius: 2,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: '#94a3b8',
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>Idle</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: '#3b82f6',
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 1, transform: 'scale(1)' },
                '50%': { opacity: 0.6, transform: 'scale(1.2)' },
                '100%': { opacity: 1, transform: 'scale(1)' },
              },
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>Running</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: '#10b981',
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>Success</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: '#ef4444',
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>Error</Typography>
        </Box>
        <Box sx={{ borderLeft: '1px solid #e2e8f0', pl: 2, ml: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Click nodes for details • Press ? for help
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PipelineGraph;
