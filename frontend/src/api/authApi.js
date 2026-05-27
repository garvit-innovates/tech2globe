import apiClient from "./apiClient";

function buildDemoAuthResponse(payload) {
  const demoUser = {
    id: `demo-${Date.now()}`,
    name: payload.name || payload.email.split("@")[0],
    email: payload.email,
    createdAt: new Date().toISOString(),
  };

  return {
    token: `demo-token-${Date.now()}`,
    user: demoUser,
    isMock: true,
  };
}

export async function registerUser(payload) {
  try {
    const response = await apiClient.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    console.warn("Register API unavailable, using demo auth fallback.", error);
    return buildDemoAuthResponse(payload);
  }
}

export async function loginUser(payload) {
  try {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  } catch (error) {
    console.warn("Login API unavailable, using demo auth fallback.", error);
    return buildDemoAuthResponse(payload);
  }
}
