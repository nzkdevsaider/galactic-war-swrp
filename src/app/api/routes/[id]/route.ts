import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Route from "../../../../models/Route";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = params;

  try {
    await dbConnect();

    const route = await Route.findOne({ _id: id })
      .populate("source")
      .populate("target");

    if (!route) {
      return NextResponse.json(
        { success: false, message: `Ruta con id '${id}' no encontrada` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: route }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching route with id ${id}:`, error);
    return NextResponse.json(
      { success: false, message: "Error del servidor al obtener la ruta" },
      { status: 500 }
    );
  }
}
