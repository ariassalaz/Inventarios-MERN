export async function apiFetch(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // si vino HTML/Proxy error, lo devolvemos como texto para ver el problema
    throw new Error(text || "Respuesta no válida del servidor");
  }

  if (!res.ok) {
    const msg = data?.mensaje || data?.message || "Error en la petición";
    throw new Error(msg);
  }

  return data;
}