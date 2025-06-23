import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";

const API_BASE_URL = process.env.BACKEND_URL;

export async function makeApiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const session = await getServerSession(authOptions);

  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user?.token}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Erro na API externa: ${response.status}`
    );
  }

  return await response.json();
}

export async function validateSession(session: unknown) {
  if (!session) {
    throw new Error("Não autorizado");
  }
}
