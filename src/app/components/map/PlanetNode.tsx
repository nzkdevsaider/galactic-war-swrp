import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import clsx from "clsx";

type PlanetNodeData = {
  label: string;
  faction: string;
};

const factionStyles: { [key: string]: string } = {
  Republicano: "bg-red-800 border-red-500 hover:shadow-red-400/40",
  Separatista: "bg-blue-800 border-blue-500 hover:shadow-blue-400/40",
  Neutral: "bg-yellow-800 border-yellow-500 hover:shadow-yellow-400/40",
  Mandalore: "bg-gray-600 border-gray-400 hover:shadow-gray-300/40",
  Contrabandista: "bg-green-800 border-green-500 hover:shadow-green-400/40",
  "En Disputa": "bg-purple-800 border-purple-500 hover:shadow-purple-400/40",
};

export function PlanetNode({ data }: NodeProps<PlanetNodeData>) {
  const baseClasses =
    "w-[90px] h-[90px] rounded-full flex items-center justify-center text-center text-white text-sm border-2 p-1 font-sans shadow-lg transition-shadow duration-300";

  const factionClass = factionStyles[data.faction] || factionStyles.Neutral;

  return (
    <div className={clsx(baseClasses, factionClass)}>
      <Handle type="source" position={Position.Top} className="opacity-0" />

      <div className="pointer-events-none">{data.label}</div>

      <Handle type="target" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}
