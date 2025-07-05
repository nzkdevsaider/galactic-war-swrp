import mongoose, { Schema, Document } from "mongoose";

export interface IPlanet extends Document {
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

const PlanetSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  faction: {
    type: String,
    enum: [
      "Republicano",
      "Separatista",
      "Neutral",
      "Contrabandista",
      "Mandalore",
      "En Disputa",
    ],
    default: "Neutral",
  },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
});

export default mongoose.models.Planet ||
  mongoose.model<IPlanet>("Planet", PlanetSchema);
