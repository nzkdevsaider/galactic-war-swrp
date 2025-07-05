import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Planet from "../../../../models/Planet";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = params;

  try {
    await dbConnect();

    const planet = await Planet.findOne({ _id: id });

    if (!planet) {
      return NextResponse.json(
        { success: false, message: `Planeta con id '${id}' no encontrado` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: planet }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching planet with id ${id}:`, error);
    return NextResponse.json(
      { success: false, message: "Error del servidor al obtener el planeta" },
      { status: 500 }
    );
  }
}
