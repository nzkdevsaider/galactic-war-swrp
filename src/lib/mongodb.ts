import mongoose from "mongoose";

// Extraemos la URI del entorno. Si no existe, lanzamos un error.
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Por favor, define la variable de entorno MONGODB_URI dentro de .env.local"
  );
}

/**
 * Caché de la conexión global para evitar crear una nueva conexión en cada recarga
 * en el entorno de desarrollo (HMR - Hot Module Replacement).
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
