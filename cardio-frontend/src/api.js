export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL && process.env.REACT_APP_API_BASE_URL.trim().length > 0
    ? process.env.REACT_APP_API_BASE_URL.trim().replace(/\/+$/, '')
    : '';

export async function postJson(path, body) {
  const url = `${API_BASE_URL}${path}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // Handle network errors
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || `Server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle fetch errors (network, CORS, etc.)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Failed to connect to the server. Please make sure the backend is running on http://localhost:5000'
      );
    }
    // Re-throw other errors
    throw error;
  }
}


