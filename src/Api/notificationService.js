// services/notificationService.js

const API_BASE_URL = 'https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api';

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('authToken');

// Get current user ID
export const getCurrentUserId = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const parsed = JSON.parse(userInfo);
      return parsed.userId;
    } catch (e) {
      return null;
    }
  }
  return null;
};

// Fetch all career goals (IDs 1-8)
const getAllCareerGoalIds = () => {
  // Based on your API, career goals from 1 to 8
  return Array.from({ length: 8 }, (_, i) => i + 1);
};

// Fetch all posts for a specific career goal
const fetchPostsByCareerGoal = async (careerGoalId) => {
  const token = getAuthToken();
  if (!token) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/Community/career-goals/${careerGoalId}/posts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data) {
        return data.data;
      }
    }
    return [];
  } catch (err) {
    console.error(`Error fetching posts for career goal ${careerGoalId}:`, err);
    return [];
  }
};

// Fetch all posts from all career goals
export const fetchAllPosts = async () => {
  const goalIds = getAllCareerGoalIds();
  const allPosts = [];

  for (const goalId of goalIds) {
    const posts = await fetchPostsByCareerGoal(goalId);
    allPosts.push(...posts);
  }

  // Remove duplicates based on postId
  const uniquePosts = Array.from(
    new Map(allPosts.map(post => [post.postId, post])).values()
  );

  return uniquePosts;
};

// Fetch full post details including comments
export const fetchPostDetails = async (postId) => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/Community/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-cache'
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data) {
        return data.data;
      }
    }
    return null;
  } catch (err) {
    console.error(`Error fetching post details for ${postId}:`, err);
    return null;
  }
};

// Get user info from API
export const fetchUserInfo = async () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('userFirstName', data.firstName || '');
      localStorage.setItem('userLastName', data.lastName || '');
      localStorage.setItem('userFullName', `${data.firstName || ''} ${data.lastName || ''}`.trim());
      return data;
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch user info:", err);
    return null;
  }
};

// Get current user info from localStorage or API
export const getCurrentUserInfo = async () => {
  const storedInfo = localStorage.getItem('userInfo');
  if (storedInfo) {
    try {
      return JSON.parse(storedInfo);
    } catch (e) {
      return await fetchUserInfo();
    }
  }
  return await fetchUserInfo();
};