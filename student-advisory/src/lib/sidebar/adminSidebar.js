export const sidebarAdmin = [
  { section: "Menu" },
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: "LayoutDashboard",
  },

  { section: "Students" },
  {
    name: "Upload Mentees",
    href: "/admin/uploadFiles",
    icon: "Upload",
  },
  {
    name: "All Mentees",
    href: "/admin/listStudent",
    icon: "UserRoundCheck"
  },

  { section: "Mentors" },
  {
    name: "Upload Mentors",
    href: "/admin/uploadMentor",
    icon: "Upload"
  },
  {
    name: "All Mentors",
    href: "/admin/listMentor",
    icon: "Users",
  },

  { section: "Assignments" },
  {
    name: "Assigned Mentees",
    href: "/admin/assignMentees",
    icon: "Users"
  },
  {
    name: "View Assignment",
    href: "/admin/viewAssignment",
    icon: "View"
  },

  { section: "Report" },
  {
    name: "Report Mentor",
    href: "/admin/report",
    icon: "ClipboardPlus"
  },

  {
    name: "Logout",
    action: "logout",
    icon: "LogOut",
  },
];