import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WarningIcon from "@mui/icons-material/Warning";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CategoryIcon from "@mui/icons-material/Category";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [animate, setAnimate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users"); // users, skills, interests, goals
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Filter states
  const [filters, setFilters] = useState({
    careerGoal: "",
    topSkill: ""
  });
  
  const [users, setUsers] = useState([]);
  
  // Master data states
  const [masterData, setMasterData] = useState({
    skills: [],
    interests: [],
    careerGoals: []
  });
  
  // Modal states for different entities
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [modalType, setModalType] = useState("user"); // user, skill, interest, goal
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    skills: "",
    interests: "",
    careerGoal: "",
    email: "",
    topSkill: ""
  });
  
  // State for skill management
  const [currentSkill, setCurrentSkill] = useState({
    id: null,
    name: "",
    category: ""
  });
  
  // State for interest management
  const [currentInterest, setCurrentInterest] = useState({
    id: null,
    name: ""
  });
  
  // State for career goal management
  const [currentGoal, setCurrentGoal] = useState({
    id: null,
    name: "",
    description: ""
  });
  
  // State for role assignment
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUserForRole, setSelectedUserForRole] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [userRoles, setUserRoles] = useState([]);
  
  // State for skill-goal assignment
  const [showSkillGoalModal, setShowSkillGoalModal] = useState(false);
  const [skillGoalAssignment, setSkillGoalAssignment] = useState({
    careerGoalId: "",
    skillId: "",
    requiredLevel: 1,
    priority: 1
  });

  // Get unique career goals and top skills for filter options
  const uniqueCareerGoals = [...new Set(users.map(u => u.careerGoal))];
  const uniqueTopSkills = [...new Set(users.map(u => u.topSkill))];

  // Helper function to get random color
  const getRandomColor = () => {
    const colors = ["#0A5ADB", "#58A7B5", "#667eea", "#f59e0b", "#10b981", "#8b5cf6", "#ec489a", "#14b8a6", "#f43f5e"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Get JWT token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // ==================== USER MANAGEMENT ENDPOINTS ====================
  
  // GET /api/Admin/users - Fetch all users
  const fetchUsersFromAPI = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/users/profile-summaries', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const transformedUsers = result.data.map((user, index) => ({
            id: user.userId || index,
            name: `${user.firstName} ${user.lastName}`,
            skills: user.skills.map(skill => skill.skillName),
            interests: user.interests.map(interest => interest.interestName),
            careerGoal: user.careerGoalName || "Not Specified",
            email: user.email,
            avatar: `${user.firstName} ${user.lastName}`.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            color: getRandomColor(),
            topSkill: user.skills.length > 0 ? user.skills[0].skillName : "General",
            careerGoalId: user.careerGoalId,
            skillsWithLevel: user.skills,
            interestsWithId: user.interests,
            careerGoalMessage: user.careerGoalMessage,
            skillsMessage: user.skillsMessage,
            interestsMessage: user.interestsMessage
          }));
          setUsers(transformedUsers);
          return transformedUsers;
        }
      } else if (response.status === 401) {
        setAlertTitle("Authentication Error");
        setAlertMessage("Please log in again to continue.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching user profile summaries:', error);
      setAlertTitle("Error");
      setAlertMessage("Failed to fetch user profiles from server.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  // DELETE /api/Admin/users/{userId} - Delete single user
  const deleteUser = async (userId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };

  // GET /api/Admin/users/{userId}/roles - Fetch user roles
  const fetchUserRoles = async (userId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/users/${userId}/roles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const roles = await response.json();
        setUserRoles(roles);
        return roles;
      }
      return [];
    } catch (error) {
      console.error('Error fetching user roles:', error);
      return [];
    }
  };

  // POST /api/Admin/users/assign-role - Assign role to user
  const assignRoleToUser = async (userId, roleName) => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/users/assign-role', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, roleName })
      });
      return response.ok;
    } catch (error) {
      console.error('Error assigning role:', error);
      return false;
    }
  };

  // POST /api/Admin/users/remove-role - Remove role from user
  const removeRoleFromUser = async (userId, roleName) => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/users/remove-role', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, roleName })
      });
      return response.ok;
    } catch (error) {
      console.error('Error removing role:', error);
      return false;
    }
  };

  // ==================== SKILL MANAGEMENT ENDPOINTS ====================
  
  // GET /api/Admin/skills - Fetch all skills
  const fetchSkills = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/skills', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const skills = await response.json();
        setMasterData(prev => ({ ...prev, skills }));
        return skills;
      }
      return [];
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  };

  // POST /api/Admin/skills - Create new skill
  const createSkill = async (skillData) => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/skills', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(skillData)
      });
      return response.ok;
    } catch (error) {
      console.error('Error creating skill:', error);
      return false;
    }
  };

  // PUT /api/Admin/skills/{skillId} - Update skill
  const updateSkill = async (skillId, skillData) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/skills/${skillId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(skillData)
      });
      return response.ok;
    } catch (error) {
      console.error('Error updating skill:', error);
      return false;
    }
  };

  // DELETE /api/Admin/skills/{skillId} - Delete skill
  const deleteSkill = async (skillId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/skills/${skillId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting skill:', error);
      return false;
    }
  };

  // ==================== INTEREST MANAGEMENT ENDPOINTS ====================
  
  // GET /api/Admin/interests - Fetch all interests
  const fetchInterests = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/interests', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const interests = await response.json();
        setMasterData(prev => ({ ...prev, interests }));
        return interests;
      }
      return [];
    } catch (error) {
      console.error('Error fetching interests:', error);
      return [];
    }
  };

  // POST /api/Admin/interests - Create new interest
  const createInterest = async (interestData) => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/interests', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(interestData)
      });
      return response.ok;
    } catch (error) {
      console.error('Error creating interest:', error);
      return false;
    }
  };

  // ==================== CAREER GOAL MANAGEMENT ENDPOINTS ====================
  
  // GET /api/Admin/careergoals - Fetch all career goals
  const fetchCareerGoals = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/careergoals', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const goals = await response.json();
        setMasterData(prev => ({ ...prev, careerGoals: goals }));
        return goals;
      }
      return [];
    } catch (error) {
      console.error('Error fetching career goals:', error);
      return [];
    }
  };

  // POST /api/Admin/careergoal - Create new career goal
  const createCareerGoal = async (goalData) => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/careergoal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goalData)
      });
      return response.ok;
    } catch (error) {
      console.error('Error creating career goal:', error);
      return false;
    }
  };

  // ==================== MASTER DATA ENDPOINT ====================
  
  // GET /api/Admin/MasterData - Fetch all master data
  const fetchMasterData = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/MasterData', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMasterData({
          skills: data.skills || [],
          interests: data.interests || [],
          careerGoals: data.careerGoals || []
        });
      }
    } catch (error) {
      console.error('Error fetching master data:', error);
    }
  };

  // ==================== SKILL-GOAL ASSIGNMENT ENDPOINT ====================
  
  // POST /api/Admin/career-goals/assign-skill - Assign skill to career goal
  const assignSkillToGoal = async (assignmentData) => {
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/career-goals/assign-skill', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignmentData)
      });
      return response.ok;
    } catch (error) {
      console.error('Error assigning skill to goal:', error);
      return false;
    }
  };

  // ==================== INITIALIZATION ====================
  
  useEffect(() => {
    setAnimate(true);
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchUsersFromAPI(),
      fetchMasterData(),
      fetchSkills(),
      fetchInterests(),
      fetchCareerGoals()
    ]);
    setLoading(false);
  };

  // Apply filters and search
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.careerGoal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCareerGoal = !filters.careerGoal || user.careerGoal === filters.careerGoal;
    const matchesTopSkill = !filters.topSkill || user.topSkill === filters.topSkill;
    
    return matchesSearch && matchesCareerGoal && matchesTopSkill;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSelectAll(false);
    setSelectedUsers([]);
  }, [filters, searchTerm]);

  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(mid => mid !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentItems.map(u => u.id));
    }
    setSelectAll(!selectAll);
  };

  // Bulk Delete - Multiple Rows
  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;
    setShowBulkDeleteConfirm(true);
  };

  const confirmBulkDelete = async () => {
    let deletedCount = 0;
    let failedCount = 0;
    
    for (const userId of selectedUsers) {
      const success = await deleteUser(userId);
      if (success) {
        deletedCount++;
      } else {
        failedCount++;
      }
    }
    
    await fetchUsersFromAPI();
    setSelectedUsers([]);
    setSelectAll(false);
    setShowBulkDeleteConfirm(false);
    
    if (deletedCount > 0) {
      setAlertTitle("Users Deleted");
      setAlertMessage(`${deletedCount} user${deletedCount !== 1 ? 's' : ''} removed successfully.${failedCount > 0 ? ` ${failedCount} failed.` : ''}`);
      setShowAlert(true);
    }
  };

  const cancelBulkDelete = () => {
    setShowBulkDeleteConfirm(false);
  };

  // Single Delete User
  const handleDeleteUser = (id, name) => {
    setUserToDelete({ id, name });
    setShowDeleteConfirm(true);
  };

  const confirmSingleDelete = async () => {
    if (userToDelete) {
      const success = await deleteUser(userToDelete.id);
      
      if (success) {
        await fetchUsersFromAPI();
        setSelectedUsers(selectedUsers.filter(mid => mid !== userToDelete.id));
        setAlertTitle("User Deleted");
        setAlertMessage(`User "${userToDelete.name}" has been removed successfully.`);
        setShowAlert(true);
      } else {
        setAlertTitle("Error");
        setAlertMessage(`Failed to delete user "${userToDelete.name}".`);
        setShowAlert(true);
      }
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  const cancelSingleDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  // ==================== MODAL HANDLERS ====================
  
  // User Modal Handlers
  // const handleEditUser = (user) => {
  //   setModalType("user");
  //   setModalMode("edit");
  //   setCurrentUser({
  //     ...user,
  //     skills: Array.isArray(user.skills) ? user.skills.join(", ") : user.skills,
  //     interests: Array.isArray(user.interests) ? user.interests.join(", ") : user.interests
  //   });
  //   setShowModal(true);
  // };

  // Skill Modal Handlers
  const handleAddSkill = () => {
    setModalType("skill");
    setModalMode("add");
    setCurrentSkill({ id: null, name: "", category: "" });
    setShowModal(true);
  };

  const handleEditSkill = (skill) => {
    setModalType("skill");
    setModalMode("edit");
    setCurrentSkill(skill);
    setShowModal(true);
  };

  const handleDeleteSkill = async (skillId, skillName) => {
    const success = await deleteSkill(skillId);
    if (success) {
      await fetchSkills();
      setAlertTitle("Skill Deleted");
      setAlertMessage(`Skill "${skillName}" has been removed successfully.`);
      setShowAlert(true);
    } else {
      setAlertTitle("Error");
      setAlertMessage(`Failed to delete skill "${skillName}".`);
      setShowAlert(true);
    }
  };

  // Interest Modal Handlers
  const handleAddInterest = () => {
    setModalType("interest");
    setModalMode("add");
    setCurrentInterest({ id: null, name: "" });
    setShowModal(true);
  };

  const handleEditInterest = (interest) => {
    setModalType("interest");
    setModalMode("edit");
    setCurrentInterest(interest);
    setShowModal(true);
  };

  // Career Goal Modal Handlers
  const handleAddGoal = () => {
    setModalType("goal");
    setModalMode("add");
    setCurrentGoal({ id: null, name: "", description: "" });
    setShowModal(true);
  };

  const handleEditGoal = (goal) => {
    setModalType("goal");
    setModalMode("edit");
    setCurrentGoal(goal);
    setShowModal(true);
  };

  // Role Assignment Handler
  const handleManageRoles = async (user) => {
    setSelectedUserForRole(user);
    await fetchUserRoles(user.id);
    setShowRoleModal(true);
  };

  const handleAssignRole = async () => {
    if (!selectedUserForRole || !roleName) return;
    
    const success = await assignRoleToUser(selectedUserForRole.id, roleName);
    if (success) {
      await fetchUserRoles(selectedUserForRole.id);
      setAlertTitle("Role Assigned");
      setAlertMessage(`Role "${roleName}" assigned to ${selectedUserForRole.name}`);
      setShowAlert(true);
      setRoleName("");
    } else {
      setAlertTitle("Error");
      setAlertMessage("Failed to assign role.");
      setShowAlert(true);
    }
  };

  const handleRemoveRole = async (roleName) => {
    if (!selectedUserForRole) return;
    
    const success = await removeRoleFromUser(selectedUserForRole.id, roleName);
    if (success) {
      await fetchUserRoles(selectedUserForRole.id);
      setAlertTitle("Role Removed");
      setAlertMessage(`Role "${roleName}" removed from ${selectedUserForRole.name}`);
      setShowAlert(true);
    } else {
      setAlertTitle("Error");
      setAlertMessage("Failed to remove role.");
      setShowAlert(true);
    }
  };

  // Skill-Goal Assignment Handler
  const handleOpenSkillGoalModal = () => {
    setShowSkillGoalModal(true);
  };

  const handleAssignSkillToGoal = async () => {
    const success = await assignSkillToGoal(skillGoalAssignment);
    if (success) {
      setAlertTitle("Success");
      setAlertMessage("Skill assigned to career goal successfully.");
      setShowAlert(true);
      setShowSkillGoalModal(false);
      setSkillGoalAssignment({ careerGoalId: "", skillId: "", requiredLevel: 1, priority: 1 });
    } else {
      setAlertTitle("Error");
      setAlertMessage("Failed to assign skill to career goal.");
      setShowAlert(true);
    }
  };

  // Save Handler (Generic)
  const handleSave = async () => {
    if (modalType === "user") {
      await handleSaveUser();
    } else if (modalType === "skill") {
      await handleSaveSkill();
    } else if (modalType === "interest") {
      await handleSaveInterest();
    } else if (modalType === "goal") {
      await handleSaveGoal();
    }
  };

  const handleSaveUser = async () => {
    const missingFields = [];
    if (!currentUser.name) missingFields.push("Full Name");
    if (!currentUser.careerGoal) missingFields.push("Career Goal");
    if (!currentUser.email) missingFields.push("Email");
    
    if (missingFields.length > 0) {
      setAlertTitle("Missing Required Fields");
      setAlertMessage(`Please fill in: ${missingFields.join(", ")}`);
      setShowAlert(true);
      return;
    }

    await fetchUsersFromAPI();
    
    setAlertTitle("Success!");
    setAlertMessage(`User "${currentUser.name}" has been ${modalMode === "add" ? "added" : "updated"} successfully.`);
    setShowAlert(true);
    setShowModal(false);
  };

  const handleSaveSkill = async () => {
    if (!currentSkill.name) {
      setAlertTitle("Missing Field");
      setAlertMessage("Please enter skill name.");
      setShowAlert(true);
      return;
    }

    let success;
    if (modalMode === "add") {
      success = await createSkill({ name: currentSkill.name, category: currentSkill.category || "" });
    } else {
      success = await updateSkill(currentSkill.id, { name: currentSkill.name, category: currentSkill.category || "" });
    }

    if (success) {
      await fetchSkills();
      setAlertTitle("Success!");
      setAlertMessage(`Skill "${currentSkill.name}" has been ${modalMode === "add" ? "added" : "updated"} successfully.`);
      setShowAlert(true);
      setShowModal(false);
    } else {
      setAlertTitle("Error");
      setAlertMessage(`Failed to ${modalMode === "add" ? "add" : "update"} skill.`);
      setShowAlert(true);
    }
  };

  const handleSaveInterest = async () => {
    if (!currentInterest.name) {
      setAlertTitle("Missing Field");
      setAlertMessage("Please enter interest name.");
      setShowAlert(true);
      return;
    }

    const success = await createInterest({ name: currentInterest.name });

    if (success) {
      await fetchInterests();
      setAlertTitle("Success!");
      setAlertMessage(`Interest "${currentInterest.name}" has been added successfully.`);
      setShowAlert(true);
      setShowModal(false);
    } else {
      setAlertTitle("Error");
      setAlertMessage("Failed to add interest.");
      setShowAlert(true);
    }
  };

  const handleSaveGoal = async () => {
    if (!currentGoal.name) {
      setAlertTitle("Missing Field");
      setAlertMessage("Please enter career goal name.");
      setShowAlert(true);
      return;
    }

    const success = await createCareerGoal({ 
      name: currentGoal.name, 
      description: currentGoal.description || "" 
    });

    if (success) {
      await fetchCareerGoals();
      setAlertTitle("Success!");
      setAlertMessage(`Career goal "${currentGoal.name}" has been added successfully.`);
      setShowAlert(true);
      setShowModal(false);
    } else {
      setAlertTitle("Error");
      setAlertMessage("Failed to add career goal.");
      setShowAlert(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowRoleModal(false);
    setShowSkillGoalModal(false);
    setCurrentUser({ id: null, name: "", skills: "", interests: "", careerGoal: "", email: "", topSkill: "" });
    setCurrentSkill({ id: null, name: "", category: "" });
    setCurrentInterest({ id: null, name: "" });
    setCurrentGoal({ id: null, name: "", description: "" });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ careerGoal: "", topSkill: "" });
    setSearchTerm("");
    setShowFilterDropdown(false);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
    setAlertTitle("");
  };

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectAll(false);
      setSelectedUsers([]);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const hasActiveFilters = filters.careerGoal !== "" || filters.topSkill !== "" || searchTerm !== "";

  // Render different content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case "users":
        return renderUsersTable();
      case "skills":
        return renderSkillsManagement();
      case "interests":
        return renderInterestsManagement();
      case "goals":
        return renderGoalsManagement();
      default:
        return renderUsersTable();
    }
  };

  const renderUsersTable = () => (
    <>
      <div className={styles.table_container}>
        <table className={styles.team_table}>
          <thead>
            <tr>
              <th className={styles.checkbox_col}>
                <input type="checkbox" checked={selectAll && currentItems.length > 0} onChange={handleSelectAll} className={styles.checkbox} />
              </th>
              <th>User</th>
              <th>Skills</th>
              <th>Interests</th>
              <th>Career Goal</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((user) => (
                <tr key={user.id} className={`${styles.table_row} ${selectedUsers.includes(user.id) ? styles.selected_row : ""}`}>
                  <td className={styles.checkbox_col}>
                    <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelectUser(user.id)} className={styles.checkbox} />
                  </td>
                  <td>
                    <div className={styles.member_info}>
                      <div className={styles.member_avatar} style={{ background: `${user.color}15`, color: user.color }}>
                        {user.avatar}
                      </div>
                      <span className={styles.member_name}>{user.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.skills_container}>
                      {user.skills.map((skill, idx) => (
                        <span key={idx} className={styles.skill_badge}>{skill}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className={styles.interests_container}>
                      {user.interests.map((interest, idx) => (
                        <span key={idx} className={styles.interest_badge}>{interest}</span>
                      ))}
                    </div>
                  </td>
                  <td><span className={styles.career_badge}>{user.careerGoal}</span></td>
                  <td className={styles.email_cell}>{user.email}</td>
                  <td>
                    <div className={styles.action_icons}>
                      {/* <EditIcon className={styles.edit_icon} onClick={() => handleEditUser(user)} /> */}
                      <AssignmentIcon className={styles.role_icon} onClick={() => handleManageRoles(user)} />
                      <DeleteIcon className={styles.delete_icon} onClick={() => handleDeleteUser(user.id, user.name)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.no_results}>
                  <div className={styles.no_results_content}>
                    <span className={styles.no_results_icon}>🔍</span>
                    <p>No users found</p>
                    <button onClick={clearFilters} className={styles.clear_filters_link}>Clear all filters</button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredUsers.length > 0 && (
        <div className={styles.pagination}>
          <div className={styles.pagination_info}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className={styles.pagination_controls}>
            <button className={`${styles.pagination_btn} ${currentPage === 1 ? styles.disabled : ""}`} onClick={goToPreviousPage} disabled={currentPage === 1}>
              <ChevronLeftIcon className={styles.pagination_icon} /> Previous
            </button>
            <div className={styles.pagination_numbers}>
              {getPageNumbers().map((page, idx) => (
                page === '...' ? <span key={idx} className={styles.pagination_dots}>...</span> :
                <button key={idx} className={`${styles.pagination_number} ${currentPage === page ? styles.pagination_active : ""}`} onClick={() => goToPage(page)}>
                  {page}
                </button>
              ))}
            </div>
            <button className={`${styles.pagination_btn} ${currentPage === totalPages ? styles.disabled : ""}`} onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next <ChevronRightIcon className={styles.pagination_icon} />
            </button>
          </div>
          <div className={styles.pagination_per_page}>
            <span>Rows per page:</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={styles.per_page_select}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}
    </>
  );

  const renderSkillsManagement = () => (
    <div className={styles.management_container}>
      <div className={styles.management_header}>
        <h3>Skills Management</h3>
        <button className={styles.add_btn} onClick={handleAddSkill}>
          <AddIcon /> Add Skill
        </button>
      </div>
      <div className={styles.management_table_container}>
        <table className={styles.management_table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Skill Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {masterData.skills.map((skill) => (
              <tr key={skill.id}>
                <td>{skill.id}</td>
                <td>{skill.name}</td>
                <td>{skill.category || "-"}</td>
                <td>
                  <div className={styles.action_icons}>
                    <EditIcon className={styles.edit_icon} onClick={() => handleEditSkill(skill)} />
                    <DeleteIcon className={styles.delete_icon} onClick={() => handleDeleteSkill(skill.id, skill.name)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInterestsManagement = () => (
    <div className={styles.management_container}>
      <div className={styles.management_header}>
        <h3>Interests Management</h3>
        <button className={styles.add_btn} onClick={handleAddInterest}>
          <AddIcon /> Add Interest
        </button>
      </div>
      <div className={styles.management_table_container}>
        <table className={styles.management_table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Interest Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {masterData.interests.map((interest) => (
              <tr key={interest.id}>
                <td>{interest.id}</td>
                <td>{interest.name}</td>
                <td>
                  <div className={styles.action_icons}>
                    <EditIcon className={styles.edit_icon} onClick={() => handleEditInterest(interest)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGoalsManagement = () => (
    <div className={styles.management_container}>
      <div className={styles.management_header}>
        <h3>Career Goals Management</h3>
        <div className={styles.management_buttons}>
          <button className={styles.add_btn} onClick={handleAddGoal}>
            <AddIcon /> Add Goal
          </button>
          <button className={styles.assign_btn} onClick={handleOpenSkillGoalModal}>
            <CategoryIcon /> Assign Skill to Goal
          </button>
        </div>
      </div>
      <div className={styles.management_table_container}>
        <table className={styles.management_table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Goal Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {masterData.careerGoals.map((goal) => (
              <tr key={goal.id}>
                <td>{goal.id}</td>
                <td>{goal.name}</td>
                <td>{goal.description || "-"}</td>
                <td>
                  <div className={styles.action_icons}>
                    <EditIcon className={styles.edit_icon} onClick={() => handleEditGoal(goal)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading && users.length === 0) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_spinner}></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard_content}>
      {/* Header Section - Removed logout button since it's now in layout */}
      <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumb_home}>User Management</span>
        </div>
        <h1 className={styles.page_title}>Manage Users</h1>
        <p className={styles.page_subtitle}>View, edit, and manage all platform users</p>
      </div>

      {/* Stats Cards */}
      <div className={`${styles.stats_cards} ${animate ? styles.slide_up : ""}`}>
        <div className={styles.stat_card}>
          <div className={styles.stat_icon_wrapper} style={{ background: '#e0f2fe' }}>
            <PeopleIcon style={{ color: '#0A5ADB' }} />
          </div>
          <div className={styles.stat_info}>
            <span className={styles.stat_value}>{users.length}</span>
            <span className={styles.stat_label}>Total Users</span>
          </div>
        </div>
        <div className={styles.stat_card}>
          <div className={styles.stat_icon_wrapper} style={{ background: '#e0e7ff' }}>
            <SchoolIcon style={{ color: '#6366f1' }} />
          </div>
          <div className={styles.stat_info}>
            <span className={styles.stat_value}>{masterData.careerGoals.length}</span>
            <span className={styles.stat_label}>Career Paths</span>
          </div>
        </div>
        <div className={styles.stat_card}>
          <div className={styles.stat_icon_wrapper} style={{ background: '#fce7f3' }}>
            <EmojiEventsIcon style={{ color: '#ec489a' }} />
          </div>
          <div className={styles.stat_info}>
            <span className={styles.stat_value}>{masterData.skills.length}</span>
            <span className={styles.stat_label}>Unique Skills</span>
          </div>
        </div>
        <div className={styles.stat_card}>
          <div className={styles.stat_icon_wrapper} style={{ background: '#fef3c7' }}>
            <FavoriteIcon style={{ color: '#f59e0b' }} />
          </div>
          <div className={styles.stat_info}>
            <span className={styles.stat_value}>{masterData.interests.length}</span>
            <span className={styles.stat_label}>Interests</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Keep for switching between users/skills/interests/goals */}
      <div className={styles.tab_navigation}>
        <button className={`${styles.tab_btn} ${activeTab === "users" ? styles.tab_active : ""}`} onClick={() => setActiveTab("users")}>
          <PeopleIcon /> Users
        </button>
        <button className={`${styles.tab_btn} ${activeTab === "skills" ? styles.tab_active : ""}`} onClick={() => setActiveTab("skills")}>
          <EmojiEventsIcon /> Skills
        </button>
        <button className={`${styles.tab_btn} ${activeTab === "interests" ? styles.tab_active : ""}`} onClick={() => setActiveTab("interests")}>
          <FavoriteIcon /> Interests
        </button>
        <button className={`${styles.tab_btn} ${activeTab === "goals" ? styles.tab_active : ""}`} onClick={() => setActiveTab("goals")}>
          <SchoolIcon /> Career Goals
        </button>
      </div>

      {/* Search and Actions Bar (only for users tab) */}
      {activeTab === "users" && (
        <>
          <div className={`${styles.search_bar} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.search_wrapper}>
              <SearchIcon className={styles.search_icon} />
              <input type="text" placeholder="Search by name, email, career goal, or skills..." className={styles.search_input} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className={styles.action_buttons}>
              <div className={styles.filter_wrapper}>
                <button className={`${styles.filter_btn} ${hasActiveFilters ? styles.filter_active : ""}`} onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                  <FilterListIcon className={styles.filter_icon} /> Filter {hasActiveFilters && <span className={styles.filter_badge}>•</span>}
                </button>
                {showFilterDropdown && (
                  <div className={styles.filter_dropdown}>
                    <div className={styles.filter_header}>
                      <span>Filter Options</span>
                      <button className={styles.clear_filters_btn} onClick={clearFilters}>Clear All</button>
                    </div>
                    <div className={styles.filter_group}>
                      <label className={styles.filter_label}>Career Goal</label>
                      <select className={styles.filter_select} value={filters.careerGoal} onChange={(e) => setFilters({...filters, careerGoal: e.target.value})}>
                        <option value="">All Career Goals</option>
                        {uniqueCareerGoals.map((goal, idx) => <option key={idx} value={goal}>{goal}</option>)}
                      </select>
                    </div>
                    <div className={styles.filter_group}>
                      <label className={styles.filter_label}>Top Skill</label>
                      <select className={styles.filter_select} value={filters.topSkill} onChange={(e) => setFilters({...filters, topSkill: e.target.value})}>
                        <option value="">All Skills</option>
                        {uniqueTopSkills.map((skill, idx) => <option key={idx} value={skill}>{skill}</option>)}
                      </select>
                    </div>
                    <div className={styles.filter_actions}>
                      <button className={styles.apply_filters_btn} onClick={() => setShowFilterDropdown(false)}>Apply Filters</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bulk Delete Bar */}
          {selectedUsers.length > 0 && (
            <div className={`${styles.bulk_delete_bar} ${animate ? styles.slide_up : ""}`}>
              <div className={styles.bulk_delete_info}>
                <span className={styles.bulk_delete_count}>{selectedUsers.length}</span>
                <span>users selected</span>
              </div>
              <button className={styles.bulk_delete_btn} onClick={handleBulkDelete}>
                <DeleteSweepIcon /> Delete Selected
              </button>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className={styles.active_filters}>
              <span className={styles.active_filters_label}>Active Filters:</span>
              {searchTerm && <span className={styles.filter_tag}>Search: "{searchTerm}"<button onClick={() => setSearchTerm("")}>×</button></span>}
              {filters.careerGoal && <span className={styles.filter_tag}>Career: {filters.careerGoal}<button onClick={() => setFilters({...filters, careerGoal: ""})}>×</button></span>}
              {filters.topSkill && <span className={styles.filter_tag}>Skill: {filters.topSkill}<button onClick={() => setFilters({...filters, topSkill: ""})}>×</button></span>}
              <button className={styles.clear_all_btn} onClick={clearFilters}>Clear All</button>
            </div>
          )}
        </>
      )}

      {/* Main Content */}
      <div className={`${styles.table_section} ${animate ? styles.slide_up : ""}`}>
        {renderTabContent()}
      </div>

      {/* Modals (keep all your existing modals) */}
      {/* Single Delete Confirmation Modal */}
      {showDeleteConfirm && userToDelete && (
        <div className={styles.modal_overlay} onClick={cancelSingleDelete}>
          <div className={styles.confirm_modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirm_modal_header}>
              <div className={styles.confirm_icon_wrapper}><DeleteIcon className={styles.confirm_icon} /></div>
              <h3 className={styles.confirm_title}>Delete User</h3>
            </div>
            <div className={styles.confirm_modal_body}>
              <p>Are you sure you want to delete <strong>{userToDelete.name}</strong>?</p>
              <p className={styles.confirm_warning}>This action cannot be undone.</p>
            </div>
            <div className={styles.confirm_modal_footer}>
              <button className={styles.confirm_cancel_btn} onClick={cancelSingleDelete}>Cancel</button>
              <button className={styles.confirm_delete_btn} onClick={confirmSingleDelete}>Delete User</button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {showBulkDeleteConfirm && (
        <div className={styles.modal_overlay} onClick={cancelBulkDelete}>
          <div className={styles.confirm_modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirm_modal_header}>
              <div className={styles.confirm_icon_wrapper}><DeleteSweepIcon className={styles.confirm_icon} /></div>
              <h3 className={styles.confirm_title}>Delete Selected Users</h3>
            </div>
            <div className={styles.confirm_modal_body}>
              <p>Are you sure you want to delete <strong>{selectedUsers.length}</strong> selected {selectedUsers.length === 1 ? 'user' : 'users'}?</p>
              <p className={styles.confirm_warning}>This action cannot be undone.</p>
            </div>
            <div className={styles.confirm_modal_footer}>
              <button className={styles.confirm_cancel_btn} onClick={cancelBulkDelete}>Cancel</button>
              <button className={styles.confirm_delete_btn} onClick={confirmBulkDelete}>Delete {selectedUsers.length} {selectedUsers.length === 1 ? 'User' : 'Users'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className={styles.modal_overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal_header}>
              <h2 className={styles.modal_title}>
                {modalMode === "add" ? `Add New ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}` : `Edit ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
              </h2>
              <button className={styles.modal_close} onClick={closeModal}><CloseIcon /></button>
            </div>
            <div className={styles.modal_body}>
              {modalType === "user" && (
                <>
                  <div className={styles.form_group}><label className={styles.form_label}>Full Name *</label><input type="text" className={styles.form_input} value={currentUser.name} onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})} placeholder="Enter full name" /></div>
                  <div className={styles.form_group}><label className={styles.form_label}>Skills (comma separated)</label><input type="text" className={styles.form_input} value={currentUser.skills} onChange={(e) => setCurrentUser({...currentUser, skills: e.target.value})} placeholder="e.g., React, Node.js, Python" /></div>
                  <div className={styles.form_group}><label className={styles.form_label}>Interests (comma separated)</label><input type="text" className={styles.form_input} value={currentUser.interests} onChange={(e) => setCurrentUser({...currentUser, interests: e.target.value})} placeholder="e.g., Web Dev, AI, Open Source" /></div>
                  <div className={styles.form_group}><label className={styles.form_label}>Career Goal *</label><input type="text" className={styles.form_input} value={currentUser.careerGoal} onChange={(e) => setCurrentUser({...currentUser, careerGoal: e.target.value})} placeholder="e.g., Full Stack Developer" /></div>
                  <div className={styles.form_group}><label className={styles.form_label}>Email *</label><input type="email" className={styles.form_input} value={currentUser.email} onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})} placeholder="Enter email address" /></div>
                  <div className={styles.form_group}><label className={styles.form_label}>Top Skill</label><input type="text" className={styles.form_input} value={currentUser.topSkill} onChange={(e) => setCurrentUser({...currentUser, topSkill: e.target.value})} placeholder="e.g., React, Python, Java" /></div>
                </>
              )}
              {modalType === "skill" && (
                <>
                  <div className={styles.form_group}><label className={styles.form_label}>Skill Name *</label><input type="text" className={styles.form_input} value={currentSkill.name} onChange={(e) => setCurrentSkill({...currentSkill, name: e.target.value})} placeholder="Enter skill name" /></div>
                  <div className={styles.form_group}><label className={styles.form_label}>Category</label><input type="text" className={styles.form_input} value={currentSkill.category} onChange={(e) => setCurrentSkill({...currentSkill, category: e.target.value})} placeholder="e.g., Programming, Design, Marketing" /></div>
                </>
              )}
              {modalType === "interest" && (
                <div className={styles.form_group}><label className={styles.form_label}>Interest Name *</label><input type="text" className={styles.form_input} value={currentInterest.name} onChange={(e) => setCurrentInterest({...currentInterest, name: e.target.value})} placeholder="Enter interest name" /></div>
              )}
              {modalType === "goal" && (
                <>
                  <div className={styles.form_group}><label className={styles.form_label}>Career Goal Name *</label><input type="text" className={styles.form_input} value={currentGoal.name} onChange={(e) => setCurrentGoal({...currentGoal, name: e.target.value})} placeholder="Enter career goal name" /></div>
                  <div className={styles.form_group}><label className={styles.form_label}>Description</label><textarea className={styles.form_textarea} value={currentGoal.description} onChange={(e) => setCurrentGoal({...currentGoal, description: e.target.value})} placeholder="Enter description" rows="3" /></div>
                </>
              )}
            </div>
            <div className={styles.modal_footer}>
              <button className={styles.modal_cancel} onClick={closeModal}>Cancel</button>
              <button className={styles.modal_save} onClick={handleSave}>{modalMode === "add" ? "Add" : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Role Management Modal */}
      {showRoleModal && selectedUserForRole && (
        <div className={styles.modal_overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal_header}>
              <h2 className={styles.modal_title}>Manage Roles - {selectedUserForRole.name}</h2>
              <button className={styles.modal_close} onClick={closeModal}><CloseIcon /></button>
            </div>
            <div className={styles.modal_body}>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Current Roles</label>
                <div className={styles.roles_list}>
                  {userRoles.length > 0 ? userRoles.map((role, idx) => (
                    <div key={idx} className={styles.role_tag}>
                      {role}
                      <button className={styles.remove_role_btn} onClick={() => handleRemoveRole(role)}>×</button>
                    </div>
                  )) : <p className={styles.no_roles}>No roles assigned</p>}
                </div>
              </div>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Assign New Role</label>
                <div className={styles.assign_role_container}>
                  <input type="text" className={styles.form_input} value={roleName} onChange={(e) => setRoleName(e.target.value)} placeholder="Enter role name" />
                  <button className={styles.assign_role_btn} onClick={handleAssignRole}>Assign</button>
                </div>
              </div>
            </div>
            <div className={styles.modal_footer}>
              <button className={styles.modal_cancel} onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Skill-Goal Assignment Modal */}
      {showSkillGoalModal && (
        <div className={styles.modal_overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal_header}>
              <h2 className={styles.modal_title}>Assign Skill to Career Goal</h2>
              <button className={styles.modal_close} onClick={closeModal}><CloseIcon /></button>
            </div>
            <div className={styles.modal_body}>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Career Goal</label>
                <select className={styles.form_select} value={skillGoalAssignment.careerGoalId} onChange={(e) => setSkillGoalAssignment({...skillGoalAssignment, careerGoalId: e.target.value})}>
                  <option value="">Select Career Goal</option>
                  {masterData.careerGoals.map(goal => <option key={goal.id} value={goal.id}>{goal.name}</option>)}
                </select>
              </div>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Skill</label>
                <select className={styles.form_select} value={skillGoalAssignment.skillId} onChange={(e) => setSkillGoalAssignment({...skillGoalAssignment, skillId: e.target.value})}>
                  <option value="">Select Skill</option>
                  {masterData.skills.map(skill => <option key={skill.id} value={skill.id}>{skill.name}</option>)}
                </select>
              </div>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Required Level (1-3)</label>
                <input type="number" className={styles.form_input} min="1" max="3" value={skillGoalAssignment.requiredLevel} onChange={(e) => setSkillGoalAssignment({...skillGoalAssignment, requiredLevel: parseInt(e.target.value)})} />
              </div>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Priority (1-10)</label>
                <input type="number" className={styles.form_input} min="1" max="10" value={skillGoalAssignment.priority} onChange={(e) => setSkillGoalAssignment({...skillGoalAssignment, priority: parseInt(e.target.value)})} />
              </div>
            </div>
            <div className={styles.modal_footer}>
              <button className={styles.modal_cancel} onClick={closeModal}>Cancel</button>
              <button className={styles.modal_save} onClick={handleAssignSkillToGoal}>Assign Skill</button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {showAlert && (
        <div className={styles.modal_overlay} onClick={closeAlert}>
          <div className={styles.alert_modal} onClick={(e) => e.stopPropagation()}>
            <div className={`${styles.alert_modal_header} ${alertTitle.includes("Success") || alertTitle.includes("Deleted") ? styles.alert_success_header : styles.alert_error_header}`}>
              <div className={styles.alert_icon_wrapper}>
                {alertTitle.includes("Success") || alertTitle.includes("Deleted") ? <CheckCircleIcon className={styles.alert_icon_success} /> : <WarningIcon className={styles.alert_icon_error} />}
              </div>
              <h3 className={styles.alert_title}>{alertTitle}</h3>
            </div>
            <div className={styles.alert_modal_body}>
              <p className={styles.alert_message}>{alertMessage}</p>
            </div>
            <div className={styles.alert_modal_footer}>
              <button className={styles.alert_ok_btn} onClick={closeAlert}>Got it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;