// 🔥 Base API URL
const API_BASE_URL = "https://smartmentorapi.runasp.net/api";

/**
 * 🔹 Helper function to handle API responses
 */
const handleResponse = async (response) => {
  const text = await response.text();

  if (!response.ok) {
    const errorData = text ? JSON.parse(text) : {};
    throw new Error(errorData.message || text || "Request failed");
  }

  return text ? JSON.parse(text) : {};
};

/**
 * 🔹 Get authentication token from localStorage
 */
const getAuthToken = () => {
  // Try multiple possible token storage keys
  const token = localStorage.getItem('authToken') || 
                localStorage.getItem('token') || 
                sessionStorage.getItem('authToken') ||
                sessionStorage.getItem('token');
  
  if (!token) {
    throw new Error("No authentication token found");
  }
  
  return token;
};

/**
 * 🔹 Authenticated fetch helper
 */
const authFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  return handleResponse(response);
};

/**
 * 🔹 Register new user
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

/**
 * 🔹 Login user
 */
export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await handleResponse(response);
    
    // Store token if returned from login
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user || {}));
    }
    
    return data;
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

/**
 * 🔹 Verify email using token + code
 */
export const verifyEmail = async ({ verificationToken, code }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verificationToken, code }),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

/**
 * 🔹 Resend verification code
 */
export const resendVerificationCode = async (verificationToken) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/Auth/resend-verification-code/${verificationToken}`,
      {
        method: "POST",
      }
    );

    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

/**
 * 🔹 Send forgot password email (reset code)
 */
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

/**
 * 🔹 Reset password using code + token
 */
export const resetPassword = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

/**
 * 🔹 Get current authenticated user info
 */
export const getCurrentUser = async () => {
  try {
    return await authFetch('/Auth/me', { method: "GET" });
  } catch (error) {
    // If token is invalid, clear it
    if (error.message === "No authentication token found" || error.message.includes("401")) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
    throw new Error(error.message || "Network error");
  }
};

/**
 * 🔹 Update user profile
 */
export const updateUserProfile = async (profileData) => {
  try {
    return await authFetch('/Auth/profile', {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

/**
 * 🔹 Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('token');
};