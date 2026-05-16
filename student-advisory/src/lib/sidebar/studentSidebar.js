import { House, LogOut, Upload, Users, LayoutDashboard, UserRoundCheck, View, CalendarPlus } from "lucide-react";

export const sidebarStudent = [
    { section: "Menu" },
    {
        name: "Dashboard",
        href: "/student/dashboard",
        icon: "LayoutDashboard",
    },

    { section: "Mentor" },
    {
        name: "View Mentor",
        href: "/student/viewMentor",
        icon: "UserRoundCheck"
    },

    { section: "Session" },
    {
        name: "View Session",
        href: "/student/viewSession",
        icon: "Presentation"
    },


    {
        name: "Logout",
        action: "logout",
        icon: "LogOut",
    },
];