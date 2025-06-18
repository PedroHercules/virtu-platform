const API_BASE_URL = process.env.BACKEND_URL;

export async function makeApiRequest(
  endpoint: string,
  token: string,
  options: RequestInit = {}
) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
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
