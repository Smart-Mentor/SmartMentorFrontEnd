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

    return await handleResponse(response);
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