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

  const body: { installationToken?: string } = await response.json();
  if (!body.installationToken) {
    throw new Error(`Invalid response : installationToken.`);
  }

  await SecureStore.setItemAsync(TOKEN_KEY, body.installationToken);
  return body.installationToken;
}
