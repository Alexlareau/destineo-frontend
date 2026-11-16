import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'destineo.installation-token';
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:8000';

export async function getOrCreateInstallationToken(): Promise<string> {
  const cachedToken = await SecureStore.getItemAsync(TOKEN_KEY);
  if (cachedToken) {
    return cachedToken;
  }

  const response = await fetch(`${API_URL}/profiles/anonymous`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to create anonymous profile (${response.status})`);
  }

  const body: { installation_token?: string } = await response.json();

  if (!body.installation_token) {
    throw new Error('Réponse invalide : installation_token manquant.');
  }

  await SecureStore.setItemAsync(TOKEN_KEY, body.installation_token);
  return body.installation_token;
}
