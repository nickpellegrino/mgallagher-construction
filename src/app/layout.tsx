import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "@/components/AppLayout";
import AnnouncementBar from "@/components/AnnouncementBar";


export const metadata: Metadata = {
  title: "Michael Patrick Construction",
  description: "South Jersey custom decks and home remodeling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased flex flex-col min-h-screen"
      >
        <AnnouncementBar />
        <AppLayout>{children}</AppLayout>
      </body>
    </html >
  );
}
