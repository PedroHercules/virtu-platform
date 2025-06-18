import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import { StudentDTO } from "@/services/students/students";
import { makeApiRequest } from "@/lib/api-client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const data = await makeApiRequest(
      `/students/${params.id}`,
      session.user?.token as string,
      { method: "GET" }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar student:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const body: StudentDTO = await request.json();

    const data = await makeApiRequest(
      `/students/${params.id}`,
      session.user?.token as string,
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao atualizar student:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    await makeApiRequest(
      `/students/${params.id}`,
      session.user?.token as string,
      {
        method: "DELETE",
      }
    );

    return NextResponse.json({ message: "Student removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover student:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
