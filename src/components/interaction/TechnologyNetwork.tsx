import React, { useState, useRef, useEffect } from 'react';
import {
  Code,
  Globe,
  FileCode,
  Server,
  Box,
  Terminal,
  Bot,
  Database,
  Layers,
  Zap,
  Cloud,
  Container,
  Cpu,
  CheckCircle,
} from 'lucide-react';
import { techNodesData, techConnectionsData } from '../../data/technologies';
import { TechNode } from '../../types/technology';
import { createNetworkEntrance, highlightNetworkBranch } from '../../animations/interaction/networkGraph';

export const TechnologyNetwork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<TechNode | null>(null);

  useEffect(() => {
    const entrance = createNetworkEntrance(containerRef.current);
    return () => {
      entrance?.kill();
    };
  }, []);

  const handleNodeHover = (node: TechNode | null) => {
    setActiveNode(node);
    if (node) {
      highlightNetworkBranch(containerRef.current, node.id, node.connections);
    } else {
      highlightNetworkBranch(containerRef.current, null, []);
    }
  };

  const getIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4 text-jade-400' };
    switch (iconName) {
      case 'Code': return <Code {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'FileCode': return <FileCode {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Box': return <Box {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'Bot': return <Bot {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Cloud': return <Cloud {...props} />;
      case 'Container': return <Container {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  const getNodeCoords = (id: string) => {
    const node = techNodesData.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 50, y: 50 };
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto my-8">
      {/* Network Viewport Box */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] min-h-[480px] rounded-3xl border border-white/10 bg-obsidian-900/80 backdrop-blur-xl overflow-hidden p-4 sm:p-8 select-none shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        {/* Background Radar sweep and glowing mesh */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25" />
        <div className="absolute inset-0 bg-radial-fade" />
        
        {/* Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-jade-500/10 blur-3xl pointer-events-none" />

        {/* SVG Connections Canvas */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="jadeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F08B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#54E3A4" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {techConnectionsData.map((conn, idx) => {
            const from = getNodeCoords(conn.from);
            const to = getNodeCoords(conn.to);
            return (
              <line
                key={idx}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="0.8"
                strokeDasharray="2 1"
                className="tech-line transition-all duration-300"
                data-from={conn.from}
                data-to={conn.to}
              />
            );
          })}
        </svg>

        {/* Central JADE Core Node */}
        <div
          className="tech-core-node absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
          onMouseEnter={() => handleNodeHover(techNodesData[0])}
          onMouseLeave={() => handleNodeHover(null)}
          data-cursor-label="JADE CORE"
        >
          <div className="relative group">
            {/* Pulsing ring */}
            <div className="absolute -inset-3 rounded-full bg-jade-500/25 blur-md animate-ping opacity-75" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-obsidian-950 border-2 border-jade-400 flex flex-col items-center justify-center shadow-[0_0_35px_#00F08B] transition-transform duration-300 group-hover:scale-110">
              <Cpu className="w-6 h-6 text-jade-400 mb-0.5" />
              <span className="font-mono text-[9px] font-bold text-white tracking-widest">
                CORE
              </span>
            </div>
          </div>
        </div>

        {/* Orbiting Tech Nodes */}
        {techNodesData.slice(1).map((node) => {
          const isActive = activeNode?.id === node.id;
          const isConnectedToActive = activeNode?.connections.includes(node.id);

          return (
            <div
              key={node.id}
              className="tech-node absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => handleNodeHover(node)}
              onMouseLeave={() => handleNodeHover(null)}
              data-node-id={node.id}
              data-cursor-label="EXPLORE"
            >
              <div
                className={`group flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 select-none ${
                  isActive
                    ? 'border-jade-400 bg-jade-500/25 shadow-[0_0_25px_rgba(0,240,139,0.5)] scale-110'
                    : isConnectedToActive
                    ? 'border-jade-500/50 bg-obsidian-950/90 text-white'
                    : 'border-white/10 bg-obsidian-950/70 hover:border-jade-500/40 text-[#CBD1D9]'
                }`}
              >
                <div className="p-1 rounded-md bg-white/5">{getIcon(node.iconName)}</div>
                <span className="font-mono text-xs font-semibold whitespace-nowrap">
                  {node.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* Node Detail Inspector HUD (Bottom Overlay) */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 z-30 pointer-events-none">
          <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-obsidian-950/90 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-jade-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-jade-400 animate-pulse" />
                <span>NEURAL STACK TELEMETRY:</span>
                <span className="text-white font-bold">{activeNode ? activeNode.name : 'ALL SYSTEMS ACTIVE'}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#8B949E] max-w-xl">
                {activeNode
                  ? activeNode.description
                  : 'Hover any node in the matrix to inspect connection pathways, architecture roles, and throughput benchmarks.'}
              </p>
            </div>

            {activeNode && (
              <div className="flex items-center gap-2 flex-wrap">
                {activeNode.features.map((f, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full border border-jade-500/30 bg-jade-500/10 text-[10px] font-mono text-jade-300 flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3 text-jade-400" />
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
