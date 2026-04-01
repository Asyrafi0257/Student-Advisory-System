import { House, LogOut, Upload, Users, LayoutDashboard, UserRoundCheck } from "lucide-react";

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
    name: "List All Student",
    href:"/admin/listStudent",
    icon: UserRoundCheck
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