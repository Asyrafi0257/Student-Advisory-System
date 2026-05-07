import { House, LogOut, Upload, Users, LayoutDashboard, UserRoundCheck, View } from "lucide-react";

export const sidebarAdmin = [
  { section: "Menu" },
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  { section: "Students" },
  {
    name: "Upload Students",
    href: "/admin/uploadFiles",
    icon: Upload,
  },
  {
    name: "All Students",
    href: "/admin/listStudent",
    icon: UserRoundCheck
  },

  { section: "Mentors" },
  {
    name: "Upload Mentors",
    href: "/admin/uploadMentor",
    icon: Upload
  },
  {
    name: "All Mentors",
    href: "/admin/listMentor",
    icon: Users,
  },

  { section: "Assignments" },
  {
    name: "Assigned Mentees",
    href: "/admin/assignMentees",
    icon: Users
  },
  {
    name: "View Assignment",
    href: "/admin/viewAssignment",
    icon: View
  },

  {
    name: "Logout",
    action: "logout",
    icon: LogOut,
  },
];