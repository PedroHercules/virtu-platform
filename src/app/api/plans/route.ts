import { makeApiRequest } from "@/lib/api-client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/auth-options";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/plans?${queryString}` : "/plans";
    const data = await makeApiRequest(endpoint, session.user?.token as string, {
      method: "GET",
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao retornar planos:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
