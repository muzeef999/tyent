"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Sidebar from "@/components/ui/Sidebar";
import AppBar from "@/components/ui/AppBar";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProvider client={client}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen  bg-background text-foreground`}
      >
        {/* Main Content Area */}
          <AppBar />
        
          <div className="flex">
            <div className="fixed top-14 left-0 w-64 h-[calc(100vh-3.5rem)] z-20">
              <Sidebar />
            </div>

            <div className="flex-1 ml-64 mt-14 p-6">
              {children} 
            </div>
          </div>
      </body>
    </html>
    </ApolloProvider>
  );
}
