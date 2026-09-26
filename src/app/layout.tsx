import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clientflow.example.com"),

  title: {
    default: "ClientFlow — Manage Your Clients, Projects and Business",
    template: "%s | ClientFlow",
  },

  description:
    "Manage your clients, projects, tasks, invoices and business activity in one place.",

  applicationName: "ClientFlow",

  authors: [
    {
      name: "ClientFlow",
    },
  ],

  keywords: [
    "client management",
    "project management",
    "task management",
    "invoice management",
    "business management",
    "freelancer software",
    "agency management",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "ClientFlow",
    title: "ClientFlow — Manage Your Clients, Projects and Business",
    description:
      "Manage your clients, projects, tasks, invoices and business activity in one place.",
    url: "https://clientflow.example.com",
  },

  twitter: {
    card: "summary_large_image",
    title: "ClientFlow — Manage Your Clients, Projects and Business",
    description:
      "Manage your clients, projects, tasks, invoices and business activity in one place.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children} <Toaster /></body>
    </html>
  );
}