import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb"; // Ajusta la ruta relativa si es necesario
import Planet from "../../../models/Planet";

export async function GET() {
  try {
    await dbConnect();

    const planets = await Planet.find({});

    return NextResponse.json({ success: true, data: planets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching planets:", error);
    return NextResponse.json(
      { success: false, message: "Error del servidor al obtener los planetas" },
      { status: 500 }
    );
  }
}
