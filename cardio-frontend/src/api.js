// 🔹 If REACT_APP_API_BASE_URL is set (local dev), use it
// 🔹 Otherwise (Render production), use same-origin

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL &&
    process.env.REACT_APP_API_BASE_URL.trim().length > 0
    ? process.env.REACT_APP_API_BASE_URL.trim().replace(/\/+$/, "")
    : ""; // ← same domain in production

export async function postJson(path, body) {
  const url = `${API_BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // ❌ Server error handling
    if (!response.ok) {
      let errorMessage = `Server error: ${response.status}`;

      try {
        const data = await response.json();
        if (data?.error) errorMessage = data.error;
      } catch (_) { }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // 🌐 Network / CORS / Backend down
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to reach the server. Please check your internet connection or try again later."
      );
    }

    throw error;
  }
}
