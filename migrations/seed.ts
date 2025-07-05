import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import dbConnect from "../src/lib/mongodb";
import Planet, { IPlanet } from "../src/models/Planet";
import Route from "../src/models/Route";

interface PlanetData {
  id: string;
  name: string;
  faction:
    | "Republicano"
    | "Separatista"
    | "Neutral"
    | "Contrabandista"
    | "Mandalore"
    | "En Disputa";
  position: {
    x: number;
    y: number;
  };
}

// --- DATOS DE PRUEBA ---
const planetsData: PlanetData[] = [
  {
    id: "coruscant",
    name: "Coruscant",
    faction: "Republicano",
    position: { x: 0, y: 0 },
  },
  {
    id: "tatooine",
    name: "Tatooine",
    faction: "Neutral",
    position: { x: -300, y: 450 },
  },
  {
    id: "kamino",
    name: "Kamino",
    faction: "Republicano",
    position: { x: 500, y: 500 },
  },
  {
    id: "geonosis",
    name: "Geonosis",
    faction: "Separatista",
    position: { x: -400, y: 550 },
  },
  {
    id: "mandalore",
    name: "Mandalore",
    faction: "Mandalore",
    position: { x: 250, y: -200 },
  },
];

// --- FUNCIÓN DEL SCRIPT ---
async function seedDatabase() {
  console.log("🌱 Iniciando la siembra de la base de datos...");

  try {
    await dbConnect();
    console.log("✅ Conexión a la base de datos exitosa.");

    await Planet.deleteMany({});
    await Route.deleteMany({});
    console.log("🧹 Colecciones limpiadas.");

    const insertedPlanets = await Planet.insertMany(planetsData);
    console.log(`✨ ${insertedPlanets.length} planetas han sido insertados.`);

    const planetIdMap = new Map<string, mongoose.Types.ObjectId>();
    // CORRECCIÓN 2: Se usa 'planet.id' para la clave y se castea correctamente el _id
    insertedPlanets.forEach((planet) => {
      planetIdMap.set(planet.id, planet._id as mongoose.Types.ObjectId);
    });

    const routesToInsert = [
      {
        id: "route-1",
        source: planetIdMap.get("coruscant"),
        target: planetIdMap.get("tatooine"),
        type: "Corredor Coreliano",
      },
      {
        id: "route-2",
        source: planetIdMap.get("tatooine"),
        target: planetIdMap.get("geonosis"),
        type: "Ruta Comercial de Rima",
      },
      {
        id: "route-3",
        source: planetIdMap.get("coruscant"),
        target: planetIdMap.get("kamino"),
        type: "Ruta Hydiana",
      },
      {
        id: "route-4",
        source: planetIdMap.get("coruscant"),
        target: planetIdMap.get("mandalore"),
        type: "Espinal Comercial Coreliana",
      },
      {
        id: "route-5",
        source: planetIdMap.get("kamino"),
        target: planetIdMap.get("mandalore"),
        type: "Ruta Comercial Perlemiana",
      },
    ];

    await Route.insertMany(routesToInsert);
    console.log(`✨ ${routesToInsert.length} rutas han sido insertadas.`);

    console.log("🎉 Siembra completada exitosamente!");
  } catch (error) {
    console.error("❌ Error durante la siembra:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Conexión a la base de datos cerrada.");
  }
}

seedDatabase();
