// Simple data loader that can fetch from an API endpoint and fall back to local seed data.
import { pets as localPets } from '../data/pets';

export async function fetchPets() {
  try {
    const response = await fetch('/api/pets');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const body = await response.json();
    return body?.pets ?? body ?? localPets;
  } catch (error) {
    console.warn('Falling back to local pets:', error?.message);
    return localPets;
  }
}
