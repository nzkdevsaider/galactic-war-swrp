import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Route from "../../../models/Route";

export async function GET() {
  try {
    await dbConnect();

    const routes = await Route.find({}).populate("source").populate("target");

    return NextResponse.json({ success: true, data: routes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching routes:", error);
    return NextResponse.json(
      { success: false, message: "Error del servidor al obtener las rutas" },
      { status: 500 }
    );
  }
}
