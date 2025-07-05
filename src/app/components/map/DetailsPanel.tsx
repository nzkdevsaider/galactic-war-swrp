import React, { useState, useEffect } from "react";
import clsx from "clsx";

type ElementData = {
  type: "planet" | "route";
  data: any;
};

export function DetailsPanel({
  element,
  onClose,
}: {
  element: ElementData | null;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(!!element);

  useEffect(() => {
    if (element) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [element, shouldRender]);

  if (!shouldRender) return null;

  const isPlanet = element?.type === "planet";

  return (
    <div
      className={clsx(
        "absolute top-0 right-0 h-full w-80 bg-gray-900 bg-opacity-80 backdrop-blur-sm text-white border-l-2 border-gray-700 p-6 shadow-2xl z-10",
        isClosing ? "animate-slide-out" : "animate-slide-in"
      )}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
      >
        &times;
      </button>

      {isPlanet ? (
        <div>
          <h2 className="text-2xl font-bold mb-1">{element?.data.label}</h2>
          <p
            className={clsx(
              "text-lg font-semibold",
              element?.data.faction === "Republicano" && "text-red-400",
              element?.data.faction === "Separatista" && "text-blue-400",
              element?.data.faction === "Neutral" && "text-yellow-400",
              element?.data.faction === "Mandalore" && "text-gray-300"
            )}
          >
            {element?.data.faction}
          </p>
          <div className="border-b border-gray-700 my-4"></div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-1">Ruta Comercial</h2>
          <p className="text-lg font-semibold text-cyan-400">
            {element?.data.type}
          </p>
          <div className="border-b border-gray-700 my-4"></div>
          <div>
            <p className="text-sm text-gray-400">Conexión:</p>
            <p className="font-semibold">
              {element?.data.sourceName} &rarr; {element?.data.targetName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
