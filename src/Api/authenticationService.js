// 🔥 Base API URL
const API_BASE_URL = "https://smartmentorapi.runasp.net/api";

/**
 * 🔹 Helper function to handle API responses
 */
const handleResponse = async (response) => {
  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    console.log("FULL ERROR RESPONSE:", data);
    console.log("VALIDATION ERRORS:", JSON.stringify(data.errors, null, 2));

    throw new Error(
      data.message ||
      JSON.stringify(data.errors) ||
      text ||
      "Request failed"
    );
  }

  return data;
};

/**
 * 🔹 Get authentication token from localStorage
 */
const getAuthToken = () => {
  const token =
    localStorage.getItem("authToken") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("authToken") ||
    sessionStorage.getItem("token");

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
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  return handleResponse(response);
};

// ============================================
// 🔹 AUTH - Authentication Endpoints
// ============================================

/**
 * 🔹 Login user
 * POST /api/Auth/login
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
 * 🔹 Register new user
 * POST /api/Auth/register
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
 * 🔹 Google Login
 * POST /api/Auth/google
 */
export const googleLogin = async (idToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await handleResponse(response);
    
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
 * 🔹 Forgot Password
 * POST /api/Auth/forgot-password
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
 * 🔹 Reset Password
 * POST /api/Auth/reset-password
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
 * 🔹 Change Password
 * PUT /api/Auth/change-password
 */
export const changePassword = async (passwordData) => {
  try {
    return await authFetch('/Auth/change-password', {
      method: "PUT",
      body: JSON.stringify(passwordData),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to change password");
  }
};

/**
 * 🔹 Get Current User
 * GET /api/Auth/me
 */
export const getCurrentUser = async () => {
  try {
    return await authFetch('/Auth/me', { method: "GET" });
  } catch (error) {
    if (error.message === "No authentication token found" || error.message.includes("401")) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
    throw new Error(error.message || "Network error");
  }
};

/**
 * 🔹 Verify Email
 * POST /api/Auth/verify-email
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
 * 🔹 Resend Verification Code
 * POST /api/Auth/resend-verification-code/{verificationToken}
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
 * 🔹 Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('token');
};

// ============================================
// 🔹 USER - User Profile Endpoints
// ============================================

/**
 * 🔹 Complete User Profile
 * POST /api/User/complete-profile
 * Body: { skills: [{skillId, skillLevel}], interestIds: [], careerGoalId }
 */
export const completeUserProfile = async (profileData) => {
  try {
    return await authFetch('/User/complete-profile', {
      method: "POST",
      body: JSON.stringify(profileData),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to complete profile");
  }
};

/**
 * 🔹 Update User Profile
 * PUT /api/User/update-profile
 * Body: { skills: [{skillId, skillLevel}], interestIds: [], careerGoalId }
 */
export const updateUserProfile = async (profileData) => {
  try {
    return await authFetch('/User/update-profile', {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to update profile");
  }
};

/**
 * 🔹 Update User Skill Level
 * PATCH /api/User/update-skill-level/{skillId}
 */
export const updateUserSkillLevel = async (skillId) => {
  try {
    return await authFetch(`/User/update-skill-level/${skillId}`, {
      method: "PATCH",
    });
  } catch (error) {
    throw new Error(error.message || "Failed to update skill level");
  }
};

/**
 * 🔹 Get User Profile
 * GET /api/User/profile
 */
export const getUserProfile = async () => {
  try {
    return await authFetch('/User/profile', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch profile");
  }
};

// ============================================
// 🔹 SKILL - Skills Endpoints
// ============================================

/**
 * 🔹 Get All Skills
 * GET /api/Skill/GetAllSkills
 */
export const getAllSkills = async () => {
  try {
    return await authFetch('/Skill/GetAllSkills', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch skills");
  }
};

/**
 * 🔹 Get Skill By ID
 * GET /api/Skill/GetSkillById/{id}
 */
export const getSkillById = async (skillId) => {
  try {
    return await authFetch(`/Skill/GetSkillById/${skillId}`, { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch skill");
  }
};

// ============================================
// 🔹 INTEREST - Interests Endpoints
// ============================================

/**
 * 🔹 Get All Interests
 * GET /api/Interest/GetAllInterests
 */
export const getAllInterests = async () => {
  try {
    return await authFetch('/Interest/GetAllInterests', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch interests");
  }
};

/**
 * 🔹 Get Interest By ID
 * GET /api/Interest/GetInterestById/{id}
 */
export const getInterestById = async (interestId) => {
  try {
    return await authFetch(`/Interest/GetInterestById/${interestId}`, { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch interest");
  }
};

// ============================================
// 🔹 CAREER GOAL - Career Goals Endpoints
// ============================================

/**
 * 🔹 Get All Career Goals
 * GET /api/CareerGoal/GetAllCareerGoals
 */
export const getAllCareerGoals = async () => {
  try {
    return await authFetch('/CareerGoal/GetAllCareerGoals', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch career goals");
  }
};

/**
 * 🔹 Get Career Goal By ID
 * GET /api/CareerGoal/GetCareerGoalById/{id}
 */
export const getCareerGoalById = async (careerGoalId) => {
  try {
    return await authFetch(`/CareerGoal/GetCareerGoalById/${careerGoalId}`, { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch career goal");
  }
};

// ============================================
// 🔹 GAP ANALYSIS - Gap Analysis Endpoints
// ============================================

/**
 * 🔹 Get Gap Analysis
 * GET /api/GapAnalysis/gap-analysis
 */
export const getGapAnalysis = async () => {
  try {
    return await authFetch('/GapAnalysis/gap-analysis', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch gap analysis");
  }
};