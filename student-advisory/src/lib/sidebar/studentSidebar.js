import { House, LogOut, Upload, Users, LayoutDashboard, UserRoundCheck, View, CalendarPlus } from "lucide-react";

export const sidebarStudent = [
    { section: "Menu" },
    {
        name: "Dashboard",
        href: "/student/dashboard",
        icon: "LayoutDashboard",
    },

    { section: "Session" },
    {
        name: "View Session",
        href: "/student/viewSession",
        icon: "Presentation"
    },

    { section: "History" },
    {
        name: "History Mentor",
        href: "/student/history",
        icon: "History"
    },


    {
        name: "Logout",
        action: "logout",
        icon: "LogOut",
    },
];