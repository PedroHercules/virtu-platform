import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";
import { StudentDTO } from "@/services/students/students";
import { makeApiRequest } from "@/lib/api-client";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const body: StudentDTO = await request.json();

    const data = await makeApiRequest(
      "/students",
      session.user?.token as string,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar student:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
