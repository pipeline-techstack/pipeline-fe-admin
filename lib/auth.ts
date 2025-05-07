// Get token from localStorage
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("st_access_token")
  }
  return null
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getToken()
}

// Logout - clear token from localStorage
export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("st_access_token")
  }
}
