import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import { Result } from "@/types/result";
import { createErrorResult } from "@/lib/result-utils";

const API_BASE_URL = process.env.BACKEND_URL;

export async function makeApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<Result<T>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.token) {
      return createErrorResult("Não autorizado", "UNAUTHORIZED", 401);
    }

    const url = `${API_BASE_URL}${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.token}`,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      return {
        success: false,
        message: errorData.message || `Erro na API externa: ${response.status}`,
        errorCode: errorData.errorCode || "HTTP_ERROR",
        statusCode: response.status,
        timestamp: new Date(),
      };
    }

    const data = await response.json();

    // Se a resposta já segue o padrão Result, retorna diretamente
    if (typeof data === "object" && data !== null && "success" in data) {
      return data as Result<T>;
    }

    // Se não, envolve a resposta no padrão Result
    return {
      success: true,
      data,
      message: "Success",
      errorCode: "",
      statusCode: response.status,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error(`[API Client Error] ${endpoint}:`, error);

    return createErrorResult(
      error instanceof Error ? error.message : "Erro desconhecido",
      "NETWORK_ERROR",
      500
    );
  }
}

export async function validateSession(session: unknown): Promise<boolean> {
  return !!session;
}
