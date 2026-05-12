import { House, LogOut, Upload, Users, LayoutDashboard, UserRoundCheck, View, CalendarPlus } from "lucide-react";

export const sidebarMentor = [
  { section: "Menu" },
  {
    name: "Dashboard",
    href: "/lecturer/dashboard",
    icon: "LayoutDashboard",
  },

  { section: "Students" },
  {
    name: "View Mentee",
    href: "/lecturer/viewStudent",
    icon: "UserRoundCheck"
  },

  { section: "Session" },
  {
    name: "Create Session",
    href: "/lecturer/session",
    icon: "CalendarPlus",
  },
  {
    name: "Submit session",
    href: "/lecturer/submitsession",
    icon: "Send"
  },
  {
    name: "View Session",
    href: "/lecturer/viewSession",
    icon: "Presentation"
  },


  {
    name: "Logout",
    action: "logout",
    icon: "LogOut",
  },
];