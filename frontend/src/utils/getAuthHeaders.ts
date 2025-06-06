export function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
