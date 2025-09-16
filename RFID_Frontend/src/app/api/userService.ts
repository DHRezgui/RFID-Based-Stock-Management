export interface RegisterData {
  id?: number;
  fullname: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  fullname?: string;
  email?: string;
  password?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function registerUser(data: RegisterData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to register");
  }
  let result;
  try {
    result = await response.json();
  } catch (e) {
    throw new Error("Invalid response format");
  }
  return result;
}

export async function updateUser(id: number, data: UpdateUserData) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authentication token found");
  }
  const response = await fetch(`${API_URL}/auth/update/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Update failed:", errorText);
    throw new Error(errorText || "Failed to update user");
  }
  let result;
  try {
    result = await response.json();
  } catch (e) {
    throw new Error("Invalid response format");
  }
  return result;
}