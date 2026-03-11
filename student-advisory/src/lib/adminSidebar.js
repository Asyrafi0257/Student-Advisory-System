import { House, LogOut, Upload, View } from "lucide-react";

export const sidebarAdmin = [
    {
        name : "Dashboard",
        href : "/admin/dashboard",
        icon : House
    },
    {
        name : "Upload files",
        href : "/admin/upload",
        icon : Upload
    },
    {
        name : "View Mentor",
        href : "/admin/view",
        icon : View
    },
    {
        name : "logout",
        href : "/admin/logout",
        icon : LogOut
    }
]