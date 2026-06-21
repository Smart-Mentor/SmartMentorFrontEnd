const API_BASE_URL = "https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api";

// Helper function to handle API responses

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

//  get authentication token from localStorage
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

// Authenticated fetch helper
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


// ================= AUTH - Authentication Endpoints =================


// Login user
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

// Register new user
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

// Forgot Password
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

// Reset Password
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

// Change Password
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

// Get Current User
export const getCurrentUser = async () => {
  try {
    return await authFetch('/Auth/me', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

// Verify Email
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

// Resend Verification Code
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

// Handle Logout
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('token');
};

// ======================== USER - User Profile Endpoints ========================

/**
 * Complete User Profile
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

// Update user profile
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

// Update User Skill Level
export const updateUserSkillLevel = async (skillId) => {
  try {
    return await authFetch(`/User/update-skill-level/${skillId}`, {
      method: "PATCH",
    });
  } catch (error) {
    throw new Error(error.message || "Failed to update skill level");
  }
};

// Get user profile data (skills, interests, career goal)
export const getUserProfile = async () => {
  try {
    return await authFetch('/User/profile', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch profile");
  }
};

// Get gap analysis
export const getGapAnalysis = async () => {
  try {
    return await authFetch('/GapAnalysis/gap-analysis', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch gap analysis");
  }
};

// Update user profile (skills, interests, career goal)
export const updateUserProfileData = async (profileData) => {
  try {
    return await authFetch('/User/update-profile', {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

// ================== SKILL - Skills Endpoints ==================

// Get All Skills
export const getAllSkills = async () => {
  try {
    return await authFetch('/Skill/GetAllSkills', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch skills");
  }
};

// Get Skill By ID
export const getSkillById = async (skillId) => {
  try {
    return await authFetch(`/Skill/GetSkillById/${skillId}`, { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch skill");
  }
};

// ================== INTEREST - Interests Endpoints ==================

// Get All Interests
export const getAllInterests = async () => {
  try {
    return await authFetch('/Interest/GetAllInterests', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch interests");
  }
};

// Get Interest By ID
export const getInterestById = async (interestId) => {
  try {
    return await authFetch(`/Interest/GetInterestById/${interestId}`, { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch interest");
  }
};

// ================== CAREER GOAL - Career Goals Endpoints ==================

// Get All Career Goals
export const getAllCareerGoals = async () => {
  try {
    return await authFetch('/CareerGoal/GetAllCareerGoals', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch career goals");
  }
};

// Get Career Goal By ID
export const getCareerGoalById = async (careerGoalId) => {
  try {
    return await authFetch(`/CareerGoal/GetCareerGoalById/${careerGoalId}`, { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch career goal");
  }
};

// ================== COMMUNITY - Community Endpoints ==================

// Get all community posts
export const getCommunityPosts = async () => {
  try {
    return await authFetch('/Community/posts', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch community posts");
  }
};

// Get posts by career goal ID
export const getCommunityPostsByCareerGoal = async (careerGoalId) => {
  try {
    return await authFetch(`/Community/career-goals/${careerGoalId}/posts`, { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch posts for this career goal");
  }
};

// Get a single post by ID
export const getPostById = async (postId) => {
  try {
    return await authFetch(`/Community/posts/${postId}`, { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch post details");
  }
};

// Create a new post
export const createCommunityPost = async (postData) => {
  try {
    return await authFetch('/Community/posts', {
      method: "POST",
      body: JSON.stringify(postData),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to create post");
  }
};

// Delete a post by ID
export const deleteCommunityPost = async (postId) => {
  try {
    return await authFetch(`/Community/posts/${postId}`, { method: "DELETE" });
  } catch (error) {
    throw new Error(error.message || "Failed to delete post");
  }
};

// Add a comment to a post
export const addCommentToPost = async (postId, content) => {
  try {
    return await authFetch(`/Community/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to add comment");
  }
};

// Like a post
export const likePost = async (postId) => {
  try {
    return await authFetch(`/Community/posts/${postId}/like`, { method: "POST" });
  } catch (error) {
    throw new Error(error.message || "Failed to like post");
  }
};

// Unlike a post
export const unlikePost = async (postId) => {
  try {
    return await authFetch(`/Community/posts/${postId}/like`, { method: "DELETE" });
  } catch (error) {
    throw new Error(error.message || "Failed to unlike post");
  }
};

// ================== ADMIN - Admin Endpoints ==================

// Get all user profile summaries
export const adminGetUserProfileSummaries = async () => {
  try {
    return await authFetch('/Admin/users/profile-summaries', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user profiles");
  }
};

// Delete a user by ID
export const adminDeleteUser = async (userId) => {
  try {
    return await authFetch(`/Admin/users/${userId}`, { method: "DELETE" });
  } catch (error) {
    throw new Error(error.message || "Failed to delete user");
  }
};

// Get user roles
export const adminGetUserRoles = async (userId) => {
  try {
    return await authFetch(`/Admin/users/${userId}/roles`, { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user roles");
  }
};

// Assign role to user
export const adminAssignRole = async (userId, roleName) => {
  try {
    return await authFetch('/Admin/users/assign-role', {
      method: "POST",
      body: JSON.stringify({ userId, roleName }),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to assign role");
  }
};

// Remove role from user
export const adminRemoveRole = async (userId, roleName) => {
  try {
    return await authFetch('/Admin/users/remove-role', {
      method: "POST",
      body: JSON.stringify({ userId, roleName }),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to remove role");
  }
};

// Get all skills
export const adminGetSkills = async () => {
  try {
    return await authFetch('/Admin/skills', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch skills");
  }
};

// Create a new skill
export const adminCreateSkill = async (skillData) => {
  try {
    return await authFetch('/Admin/skills', {
      method: "POST",
      body: JSON.stringify(skillData),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to create skill");
  }
};

// Update an existing skill
export const adminUpdateSkill = async (skillId, skillData) => {
  try {
    return await authFetch(`/Admin/skills/${skillId}`, {
      method: "PUT",
      body: JSON.stringify(skillData),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to update skill");
  }
};

// Delete a skill
export const adminDeleteSkill = async (skillId) => {
  try {
    return await authFetch(`/Admin/skills/${skillId}`, { method: "DELETE" });
  } catch (error) {
    throw new Error(error.message || "Failed to delete skill");
  }
};

// Get all interests
export const adminGetInterests = async () => {
  try {
    return await authFetch('/Admin/interests', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch interests");
  }
};

// Create a new interest
export const adminCreateInterest = async (interestData) => {
  try {
    return await authFetch('/Admin/interests', {
      method: "POST",
      body: JSON.stringify(interestData),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to create interest");
  }
};

// Get all career goals
export const adminGetCareerGoals = async () => {
  try {
    return await authFetch('/Admin/careergoals', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch career goals");
  }
};

// Create a new career goal
export const adminCreateCareerGoal = async (goalData) => {
  try {
    return await authFetch('/Admin/careergoal', {
      method: "POST",
      body: JSON.stringify(goalData),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to create career goal");
  }
};

// Delete a career goal
export const adminDeleteCareerGoal = async (careerGoalId) => {
  try {
    return await authFetch(`/Admin/career-goals/${careerGoalId}`, { method: "DELETE" });
  } catch (error) {
    throw new Error(error.message || "Failed to delete career goal");
  }
};

// Remove a skill from a career goal
export const adminRemoveSkillFromGoal = async (careerGoalId, skillId) => {
  try {
    return await authFetch(`/Admin/career-goals/${careerGoalId}/skills/${skillId}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw new Error(error.message || "Failed to remove skill from career goal");
  }
};

// Get all master data (skills, interests, career goals)
export const adminGetMasterData = async () => {
  try {
    return await authFetch('/Admin/MasterData', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch master data");
  }
};

// Assign a skill to a career goal
export const adminAssignSkillToGoal = async (assignmentData) => {
  try {
    return await authFetch('/Admin/career-goals/assign-skill', {
      method: "POST",
      body: JSON.stringify(assignmentData),
    });
  } catch (error) {
    throw new Error(error.message || "Failed to assign skill to career goal");
  }
};

// Get analytics overview
export const adminGetAnalyticsOverview = async () => {
  try {
    return await authFetch('/Admin/analytics/overview', { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch analytics overview");
  }
};

// Get user growth analytics
export const adminGetUserGrowth = async (params) => {
  try {
    const { groupBy, startDate, endDate } = params || {};
    let endpoint = `/Admin/analytics/user-growth?groupBy=${groupBy || 'week'}`;
    
    if (startDate) {
      endpoint += `&startDate=${startDate}`;
    }
    if (endDate) {
      endpoint += `&endDate=${endDate}`;
    }
    
    return await authFetch(endpoint, { method: "GET" });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user growth data");
  }
};