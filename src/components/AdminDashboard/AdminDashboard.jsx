import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [animate, setAnimate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Filter states
  const [filters, setFilters] = useState({
    position: "",
    department: ""
  });
  
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Darlene Robertson",
      position: "Graphics Designer",
      department: "Sales Team",
      email: "alma.lawson@example.com",
      phone: "(252) 555-0126",
      avatar: "DR",
      color: "#0A5ADB"
    },
    {
      id: 2,
      name: "Annette Black",
      position: "Joomla Developer",
      department: "Finances",
      email: "bill.sanders@example.com",
      phone: "(252) 555-0126",
      avatar: "AB",
      color: "#58A7B5"
    },
    {
      id: 3,
      name: "Ronald Richards",
      position: "Human Resource",
      department: "Management",
      email: "weaver@example.com",
      phone: "(252) 555-0126",
      avatar: "RR",
      color: "#667eea"
    },
    {
      id: 4,
      name: "Ralph Edwards",
      position: "PHP Developer",
      department: "Engineering",
      email: "simmons@example.com",
      phone: "(252) 555-0126",
      avatar: "RE",
      color: "#f59e0b"
    },
    {
      id: 5,
      name: "Edward John",
      position: "Graphics Designer",
      department: "Sales",
      email: "lawson@example.com",
      phone: "(252) 555-0126",
      avatar: "EJ",
      color: "#10b981"
    },
    {
      id: 6,
      name: "Esther Howard",
      position: "UI UX Designer",
      department: "Human Resources",
      email: "roberts@example.com",
      phone: "(252) 555-0126",
      avatar: "EH",
      color: "#8b5cf6"
    },
    {
      id: 7,
      name: "Devon Lane",
      position: "UX Architect",
      department: "Customer Success",
      email: "tim.jennings@example.com",
      phone: "(252) 555-0126",
      avatar: "DL",
      color: "#ec489a"
    },
    {
      id: 8,
      name: "Albert Flores",
      position: "Python Developer",
      department: "Marketing",
      email: "debra.holt@example.com",
      phone: "(252) 555-0126",
      avatar: "AF",
      color: "#14b8a6"
    },
    {
      id: 9,
      name: "Courtney Henry",
      position: "Freshers",
      department: "Product",
      email: "felicia.reid@example.com",
      phone: "(252) 555-0126",
      avatar: "CH",
      color: "#f43f5e"
    },
    {
      id: 10,
      name: "John Smith",
      position: "Senior Developer",
      department: "Engineering",
      email: "john.smith@example.com",
      phone: "(252) 555-0127",
      avatar: "JS",
      color: "#0A5ADB"
    },
    {
      id: 11,
      name: "Sarah Johnson",
      position: "Product Manager",
      department: "Product",
      email: "sarah.j@example.com",
      phone: "(252) 555-0128",
      avatar: "SJ",
      color: "#58A7B5"
    },
    {
      id: 12,
      name: "Michael Brown",
      position: "QA Engineer",
      department: "Testing",
      email: "michael.b@example.com",
      phone: "(252) 555-0129",
      avatar: "MB",
      color: "#8b5cf6"
    }
  ]);

  // Get unique positions and departments for filter options
  const uniquePositions = [...new Set(teamMembers.map(m => m.position))];
  const uniqueDepartments = [...new Set(teamMembers.map(m => m.department))];

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentMember, setCurrentMember] = useState({
    id: null,
    name: "",
    position: "",
    department: "",
    email: "",
    phone: ""
  });

  // Office info
  const officeInfo = {
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    topMembers: ["Ronald Richards", "Floyd Miles", "Savannah Nguyen"],
    birthday: "12/2/1998",
    hrYear: "4 Years",
    addressDetail: "4140 Parker Rd. Allentown, New Mexico 31134"
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Apply filters and search
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = !filters.position || member.position === filters.position;
    const matchesDepartment = !filters.department || member.department === filters.department;
    
    return matchesSearch && matchesPosition && matchesDepartment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSelectAll(false);
    setSelectedTeamMembers([]);
  }, [filters, searchTerm]);

  const handleSelectMember = (id) => {
    if (selectedTeamMembers.includes(id)) {
      setSelectedTeamMembers(selectedTeamMembers.filter(mid => mid !== id));
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTeamMembers([]);
    } else {
      setSelectedTeamMembers(currentItems.map(m => m.id));
    }
    setSelectAll(!selectAll);
  };

  // Bulk Delete - Multiple Rows
  const handleBulkDelete = () => {
    if (selectedTeamMembers.length === 0) return;
    setShowBulkDeleteConfirm(true);
  };

  const confirmBulkDelete = () => {
    setTeamMembers(teamMembers.filter(member => !selectedTeamMembers.includes(member.id)));
    setSelectedTeamMembers([]);
    setSelectAll(false);
    setShowBulkDeleteConfirm(false);
  };

  const cancelBulkDelete = () => {
    setShowBulkDeleteConfirm(false);
  };

  // Single Delete Member - Open Modal
  const handleDeleteMember = (id, name) => {
    setMemberToDelete({ id, name });
    setShowDeleteConfirm(true);
  };

  const confirmSingleDelete = () => {
    if (memberToDelete) {
      setTeamMembers(teamMembers.filter(member => member.id !== memberToDelete.id));
      setSelectedTeamMembers(selectedTeamMembers.filter(mid => mid !== memberToDelete.id));
    }
    setShowDeleteConfirm(false);
    setMemberToDelete(null);
  };

  const cancelSingleDelete = () => {
    setShowDeleteConfirm(false);
    setMemberToDelete(null);
  };

  // Add Member
  const handleAddMember = () => {
    setModalMode("add");
    setCurrentMember({
      id: null,
      name: "",
      position: "",
      department: "",
      email: "",
      phone: ""
    });
    setShowModal(true);
  };

  // Edit Member
  const handleEditMember = (member) => {
    setModalMode("edit");
    setCurrentMember(member);
    setShowModal(true);
  };

  // Save Member
  const handleSaveMember = () => {
    if (!currentMember.name || !currentMember.position || !currentMember.department) {
      alert("Please fill in required fields (Name, Position, Department)");
      return;
    }

    if (modalMode === "add") {
      const newId = Math.max(...teamMembers.map(m => m.id), 0) + 1;
      const colors = ["#0A5ADB", "#58A7B5", "#667eea", "#f59e0b", "#10b981", "#8b5cf6", "#ec489a", "#14b8a6", "#f43f5e"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const initials = currentMember.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      
      const newMember = {
        ...currentMember,
        id: newId,
        avatar: initials,
        color: randomColor
      };
      setTeamMembers([...teamMembers, newMember]);
    } else {
      const updatedMembers = teamMembers.map(member => 
        member.id === currentMember.id 
          ? { ...member, ...currentMember }
          : member
      );
      setTeamMembers(updatedMembers);
    }
    
    setShowModal(false);
    setCurrentMember({
      id: null,
      name: "",
      position: "",
      department: "",
      email: "",
      phone: ""
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentMember({
      id: null,
      name: "",
      position: "",
      department: "",
      email: "",
      phone: ""
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      position: "",
      department: ""
    });
    setSearchTerm("");
    setShowFilterDropdown(false);
  };

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectAll(false);
      setSelectedTeamMembers([]);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
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

  // Check if any filter is active
  const hasActiveFilters = filters.position !== "" || filters.department !== "" || searchTerm !== "";

  return (
    <Box component="main" className={styles.admin_container}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.admin_content}>
        {/* Header Section */}
        <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumb_home}>Admin Dashboard</span>
          </div>
          <h1 className={styles.page_title}>Members List</h1>
          <p className={styles.page_subtitle}>Manage members and their information</p>
        </div>

        {/* Search and Actions Bar */}
        <div className={`${styles.search_bar} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.search_wrapper}>
            <SearchIcon className={styles.search_icon} />
            <input
              type="text"
              placeholder="Search Members..."
              className={styles.search_input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.action_buttons}>
            <div className={styles.filter_wrapper}>
              <button 
                className={`${styles.filter_btn} ${hasActiveFilters ? styles.filter_active : ""}`}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <FilterListIcon className={styles.filter_icon} />
                Filter
                {hasActiveFilters && <span className={styles.filter_badge}>•</span>}
              </button>
              
              {showFilterDropdown && (
                <div className={styles.filter_dropdown}>
                  <div className={styles.filter_header}>
                    <span>Filter Options</span>
                    <button className={styles.clear_filters_btn} onClick={clearFilters}>
                      Clear All
                    </button>
                  </div>
                  
                  <div className={styles.filter_group}>
                    <label className={styles.filter_label}>Position</label>
                    <select
                      className={styles.filter_select}
                      value={filters.position}
                      onChange={(e) => setFilters({...filters, position: e.target.value})}
                    >
                      <option value="">All Positions</option>
                      {uniquePositions.map((pos, idx) => (
                        <option key={idx} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className={styles.filter_group}>
                    <label className={styles.filter_label}>Department</label>
                    <select
                      className={styles.filter_select}
                      value={filters.department}
                      onChange={(e) => setFilters({...filters, department: e.target.value})}
                    >
                      <option value="">All Departments</option>
                      {uniqueDepartments.map((dept, idx) => (
                        <option key={idx} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className={styles.filter_actions}>
                    <button 
                      className={styles.apply_filters_btn}
                      onClick={() => setShowFilterDropdown(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className={styles.add_btn} onClick={handleAddMember}>
              + Add Member
            </button>
          </div>
        </div>

        {/* Bulk Delete Bar */}
        {selectedTeamMembers.length > 0 && (
          <div className={`${styles.bulk_delete_bar} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.bulk_delete_info}>
              <span className={styles.bulk_delete_count}>{selectedTeamMembers.length}</span>
              <span>members selected</span>
            </div>
            <button className={styles.bulk_delete_btn} onClick={handleBulkDelete}>
              <DeleteSweepIcon />
              Delete Selected
            </button>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className={styles.active_filters}>
            <span className={styles.active_filters_label}>Active Filters:</span>
            {searchTerm && (
              <span className={styles.filter_tag}>
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")}>×</button>
              </span>
            )}
            {filters.position && (
              <span className={styles.filter_tag}>
                Position: {filters.position}
                <button onClick={() => setFilters({...filters, position: ""})}>×</button>
              </span>
            )}
            {filters.department && (
              <span className={styles.filter_tag}>
                Department: {filters.department}
                <button onClick={() => setFilters({...filters, department: ""})}>×</button>
              </span>
            )}
            <button className={styles.clear_all_btn} onClick={clearFilters}>
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Grid */}
        <div className={styles.main_grid}>
          {/* Team Table Section */}
          <div className={`${styles.table_section} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.table_container}>
              <table className={styles.team_table}>
                <thead>
                  <tr>
                    <th className={styles.checkbox_col}>
                      <input
                        type="checkbox"
                        checked={selectAll && currentItems.length > 0}
                        onChange={handleSelectAll}
                        className={styles.checkbox}
                      />
                    </th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((member) => (
                      <tr key={member.id} className={`${styles.table_row} ${selectedTeamMembers.includes(member.id) ? styles.selected_row : ""}`}>
                        <td className={styles.checkbox_col}>
                          <input
                            type="checkbox"
                            checked={selectedTeamMembers.includes(member.id)}
                            onChange={() => handleSelectMember(member.id)}
                            className={styles.checkbox}
                          />
                        </td>
                        <td>
                          <div className={styles.member_info}>
                            <div 
                              className={styles.member_avatar}
                              style={{ background: `${member.color}15`, color: member.color }}
                            >
                              {member.avatar}
                            </div>
                            <span className={styles.member_name}>{member.name}</span>
                          </div>
                        </td>
                        <td>{member.position}</td>
                        <td>{member.department}</td>
                        <td>{member.email}</td>
                        <td>{member.phone}</td>
                        <td>
                          <div className={styles.action_icons}>
                            <EditIcon 
                              className={styles.edit_icon} 
                              onClick={() => handleEditMember(member)}
                            />
                            <DeleteIcon 
                              className={styles.delete_icon} 
                              onClick={() => handleDeleteMember(member.id, member.name)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className={styles.no_results}>
                        <div className={styles.no_results_content}>
                          <span className={styles.no_results_icon}>🔍</span>
                          <p>No team members found</p>
                          <button onClick={clearFilters} className={styles.clear_filters_link}>
                            Clear all filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredMembers.length > 0 && (
              <div className={styles.pagination}>
                <div className={styles.pagination_info}>
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredMembers.length)} of {filteredMembers.length} members
                </div>
                <div className={styles.pagination_controls}>
                  <button 
                    className={`${styles.pagination_btn} ${currentPage === 1 ? styles.disabled : ""}`}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className={styles.pagination_icon} />
                    Previous
                  </button>
                  
                  <div className={styles.pagination_numbers}>
                    {getPageNumbers().map((page, idx) => (
                      page === '...' ? (
                        <span key={idx} className={styles.pagination_dots}>...</span>
                      ) : (
                        <button
                          key={idx}
                          className={`${styles.pagination_number} ${currentPage === page ? styles.pagination_active : ""}`}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>
                  
                  <button 
                    className={`${styles.pagination_btn} ${currentPage === totalPages ? styles.disabled : ""}`}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRightIcon className={styles.pagination_icon} />
                  </button>
                </div>
                
                <div className={styles.pagination_per_page}>
                  <span>Rows per page:</span>
                  <select 
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className={styles.per_page_select}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Office Information */}
          <div className={`${styles.sidebar_section} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.info_card}>
              <div className={styles.card_header}>
                <div className={styles.card_icon_wrapper} style={{ background: '#e0f2fe' }}>
                  <LocationOnIcon style={{ color: '#0A5ADB' }} />
                </div>
                <h3 className={styles.card_title}>Office Location</h3>
              </div>
              <div className={styles.card_content}>
                <p className={styles.address_text}>
                  <CheckCircleIcon className={styles.check_icon} />
                  {officeInfo.address}
                </p>
              </div>
            </div>

            <div className={styles.info_card}>
              <div className={styles.card_header}>
                <div className={styles.card_icon_wrapper} style={{ background: '#e0e7ff' }}>
                  <PeopleIcon style={{ color: '#6366f1' }} />
                </div>
                <h3 className={styles.card_title}>Top Members</h3>
              </div>
              <div className={styles.card_content}>
                {officeInfo.topMembers.map((mate, idx) => (
                  <p key={idx} className={styles.team_mate}>
                    <CheckCircleIcon className={styles.check_icon} />
                    {mate}
                  </p>
                ))}
              </div>
            </div>

            <div className={styles.info_card}>
              <div className={styles.card_header}>
                <div className={styles.card_icon_wrapper} style={{ background: '#fce7f3' }}>
                  <CakeIcon style={{ color: '#ec489a' }} />
                </div>
                <h3 className={styles.card_title}>Birthday</h3>
              </div>
              <div className={styles.card_content}>
                <p className={styles.info_text}>
                  <CheckCircleIcon className={styles.check_icon} />
                  {officeInfo.birthday}
                </p>
              </div>
            </div>

            <div className={styles.info_card}>
              <div className={styles.card_header}>
                <div className={styles.card_icon_wrapper} style={{ background: '#fef3c7' }}>
                  <WorkIcon style={{ color: '#f59e0b' }} />
                </div>
                <h3 className={styles.card_title}>HR Year</h3>
              </div>
              <div className={styles.card_content}>
                <p className={styles.info_text}>
                  <CheckCircleIcon className={styles.check_icon} />
                  {officeInfo.hrYear}
                </p>
              </div>
            </div>

            <div className={styles.info_card}>
              <div className={styles.card_header}>
                <div className={styles.card_icon_wrapper} style={{ background: '#d1fae5' }}>
                  <HomeIcon style={{ color: '#10b981' }} />
                </div>
                <h3 className={styles.card_title}>Address</h3>
              </div>
              <div className={styles.card_content}>
                <p className={styles.address_text}>
                  <CheckCircleIcon className={styles.check_icon} />
                  {officeInfo.addressDetail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Single Delete Confirmation Modal */}
      {showDeleteConfirm && memberToDelete && (
        <div className={styles.modal_overlay} onClick={cancelSingleDelete}>
          <div className={styles.confirm_modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirm_modal_header}>
              <div className={styles.confirm_icon_wrapper}>
                <DeleteIcon className={styles.confirm_icon} />
              </div>
              <h3 className={styles.confirm_title}>Delete Member</h3>
            </div>
            <div className={styles.confirm_modal_body}>
              <p>Are you sure you want to delete <strong>{memberToDelete.name}</strong>?</p>
              <p className={styles.confirm_warning}>This action cannot be undone.</p>
            </div>
            <div className={styles.confirm_modal_footer}>
              <button className={styles.confirm_cancel_btn} onClick={cancelSingleDelete}>
                Cancel
              </button>
              <button className={styles.confirm_delete_btn} onClick={confirmSingleDelete}>
                Delete Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {showBulkDeleteConfirm && (
        <div className={styles.modal_overlay} onClick={cancelBulkDelete}>
          <div className={styles.confirm_modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirm_modal_header}>
              <div className={styles.confirm_icon_wrapper}>
                <DeleteSweepIcon className={styles.confirm_icon} />
              </div>
              <h3 className={styles.confirm_title}>Delete Selected Members</h3>
            </div>
            <div className={styles.confirm_modal_body}>
              <p>Are you sure you want to delete <strong>{selectedTeamMembers.length}</strong> selected {selectedTeamMembers.length === 1 ? 'member' : 'members'}?</p>
              <p className={styles.confirm_warning}>This action cannot be undone.</p>
            </div>
            <div className={styles.confirm_modal_footer}>
              <button className={styles.confirm_cancel_btn} onClick={cancelBulkDelete}>
                Cancel
              </button>
              <button className={styles.confirm_delete_btn} onClick={confirmBulkDelete}>
                Delete {selectedTeamMembers.length} {selectedTeamMembers.length === 1 ? 'Member' : 'Members'}
              </button>
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
                {modalMode === "add" ? "Add New Member" : "Edit Member"}
              </h2>
              <button className={styles.modal_close} onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
            
            <div className={styles.modal_body}>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Full Name *</label>
                <input
                  type="text"
                  className={styles.form_input}
                  value={currentMember.name}
                  onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              
              <div className={styles.form_group}>
                <label className={styles.form_label}>Position *</label>
                <input
                  type="text"
                  className={styles.form_input}
                  value={currentMember.position}
                  onChange={(e) => setCurrentMember({...currentMember, position: e.target.value})}
                  placeholder="Enter position"
                />
              </div>
              
              <div className={styles.form_group}>
                <label className={styles.form_label}>Department *</label>
                <input
                  type="text"
                  className={styles.form_input}
                  value={currentMember.department}
                  onChange={(e) => setCurrentMember({...currentMember, department: e.target.value})}
                  placeholder="Enter department"
                />
              </div>
              
              <div className={styles.form_group}>
                <label className={styles.form_label}>Email</label>
                <input
                  type="email"
                  className={styles.form_input}
                  value={currentMember.email}
                  onChange={(e) => setCurrentMember({...currentMember, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              
              <div className={styles.form_group}>
                <label className={styles.form_label}>Phone</label>
                <input
                  type="text"
                  className={styles.form_input}
                  value={currentMember.phone}
                  onChange={(e) => setCurrentMember({...currentMember, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            
            <div className={styles.modal_footer}>
              <button className={styles.modal_cancel} onClick={closeModal}>
                Cancel
              </button>
              <button className={styles.modal_save} onClick={handleSaveMember}>
                {modalMode === "add" ? "Add Member" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default AdminDashboard;