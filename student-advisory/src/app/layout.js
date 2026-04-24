import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  weight: ['400'],
  variable: "--font-bebas-neue"
})

export const metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico" }, // fallback classic favicon

      { url: "/logo-uum-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logo-uum-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-uum-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-uum-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: ["/favicon.ico"]
  },
  title: {
    default: "Student Advisory",
    template: "%s | Student Advisory"
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
