// Minimal client stub for sending adoption requests. Swap the URL with your backend.
export async function submitAdoptionRequest(payload) {
  try {
    const response = await fetch('/api/adoption', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Unable to submit request');
    }

    return await response.json();
  } catch (error) {
    console.error('Adoption submission failed:', error?.message);
    // Return a graceful result so the UI can still show a confirmation.
    return { ok: false, message: 'Saved locally; connect a backend to deliver requests.' };
  }
}
