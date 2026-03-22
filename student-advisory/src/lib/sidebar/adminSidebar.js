import { House, LogOut, Upload, Users, LayoutDashboard } from "lucide-react";

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

  { section: "Mentors" },
  {
    name: "Manage Mentors",
    href: "/admin/view",
    icon: Users,
  },

  {
    name: "Logout",
    href: "/admin/logout",
    icon: LogOut,
  },
];