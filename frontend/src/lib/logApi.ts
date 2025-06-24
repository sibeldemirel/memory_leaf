export type LogEntry = {
  _id: string;
  method: string;
  url: string;
  statusCode: number;
  timestamp: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchLogs(token: string): Promise<LogEntry[]> {
  const res = await fetch(`${BASE_URL}/api/logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Non authentifié");
    if (res.status === 403) throw new Error("Accès interdit");
    throw new Error("Erreur lors du chargement des logs");
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    console.error("Réponse inattendue :", data);
    throw new Error(
      "Format inattendu de la réponse : " +
        (typeof data === "object" ? JSON.stringify(data) : String(data))
    );
  }
  return data;
}

