import mongoose, { Schema, Document } from "mongoose";
import { IPlanet } from "./Planet"; // Importamos la interfaz del planeta

export interface IRoute extends Document {
  id: string;
  source: IPlanet["_id"];
  target: IPlanet["_id"];
  type:
    | "Ruta Hydiana"
    | "Espinal Comercial Coreliana"
    | "Ruta Comercial de Rima"
    | "Corredor Coreliano"
    | "Ruta Comercial Perlemiana";
}

const RouteSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },

  source: {
    type: Schema.Types.ObjectId,
    ref: "Planet",
    required: true,
  },
  target: {
    type: Schema.Types.ObjectId,
    ref: "Planet",
    required: true,
  },

  type: {
    type: String,
    enum: [
      "Ruta Hydiana",
      "Espinal Comercial Coreliana",
      "Ruta Comercial de Rima",
      "Corredor Coreliano",
      "Ruta Comercial Perlemiana",
    ],
    required: true,
  },
});

export default mongoose.models.Route ||
  mongoose.model<IRoute>("Route", RouteSchema);
