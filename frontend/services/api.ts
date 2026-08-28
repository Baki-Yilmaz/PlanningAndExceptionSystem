const BASE_URL = 'https://localhost:7016/api';

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const auth = typeof window !== 'undefined' ? localStorage.getItem('auth') ||localStorage.getItem('auth_credentials') : null;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { 'Authorization': `Basic ${auth}` } : {}),
      ...options?.headers,
    },
  });

    if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Hatası (${endpoint}):`, errorText);
    throw new Error(errorText || 'Merkezî API bağlantısında bir hata oluştu');
  }

  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
}