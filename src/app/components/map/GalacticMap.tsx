"use client";

import React, { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  Node,
  Edge,
  NodeMouseHandler,
  EdgeMouseHandler,
} from "reactflow";
import "reactflow/dist/style.css";

import { PlanetNode } from "./PlanetNode";
import { DetailsPanel } from "./DetailsPanel"; // Importa el nuevo panel

const nodeTypes = {
  planet: PlanetNode,
};

const routeStyles = [
  {
    type: "Corredor Coreliano",
    style: {
      stroke: "#3b82f6",
      strokeWidth: 3,
    },
    animated: true,
  },
  {
    type: "Ruta Hydiana",
    style: {
      stroke: "#10b981",
      strokeWidth: 2,
    },
    animated: false,
  },
  {
    type: "Espinal Comercial Coreliana",
    style: {
      stroke: "#8b5cf6",
      strokeWidth: 2,
    },
    animated: false,
  },
  {
    type: "Ruta Comercial de Rima",
    style: {
      stroke: "#ef4444",
      strokeWidth: 2,
    },
    animated: false,
  },
  {
    type: "Ruta Comercial Perlemiana",
    style: {
      stroke: "#06b6d4",
      strokeWidth: 2,
    },
    animated: false,
  },
];

function getRouteStyle(routeId: string, routeType: string) {
  //   const styleById = routeStyles.find((style) => style.id === routeId);
  //   if (styleById) {
  //     return {
  //       style: styleById.style,
  //       animated: styleById.animated,
  //     };
  //   }

  const styleByType = routeStyles.find((style) => style.type === routeType);
  if (styleByType) {
    return {
      style: styleByType.style,
      animated: styleByType.animated,
    };
  }

  return {
    style: { stroke: "#4b5563", strokeWidth: 2 },
    animated: false,
  };
}

export function GalacticMap() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedElement, setSelectedElement] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [planetsRes, routesRes] = await Promise.all([
          fetch("/api/planets"),
          fetch("/api/routes"),
        ]);

        const planetsData = await planetsRes.json();
        const routesData = await routesRes.json();

        const flowNodes: Node[] = planetsData.data.map((planet: any) => ({
          id: planet.id,
          type: "planet",
          position: planet.position,
          data: { label: planet.name, faction: planet.faction },
        }));

        const flowEdges: Edge[] = routesData.data.map((route: any) => {
          const routeStyle = getRouteStyle(route.id, route.type);

          return {
            id: route.id,
            source: route.source.id,
            target: route.target.id,
            type: "straight",
            data: {
              type: route.type,
              sourceName: route.source.name,
              targetName: route.target.name,
            },
            style: routeStyle.style,
            animated: routeStyle.animated,
          };
        });

        setNodes(flowNodes);
        setEdges(flowEdges);
      } catch (error) {
        console.error("Error al cargar los datos del mapa:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedElement({ type: "planet", data: node.data });
  }, []);

  const handleEdgeClick: EdgeMouseHandler = useCallback((event, edge) => {
    setSelectedElement({ type: "route", data: edge.data });
  }, []);

  const closePanel = () => setSelectedElement(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
        Cargando mapa galáctico...
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative bg-gray-950">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
          onPaneClick={closePanel}
          fitView
          className="bg-gray-950"
        >
          <Background color="#4b5563" gap={16} />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>

      <DetailsPanel element={selectedElement} onClose={closePanel} />
    </div>
  );
}
