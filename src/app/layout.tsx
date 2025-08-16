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
      <head>
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        ></script>
      </head>
      <body
        className="antialiased flex flex-col min-h-screen"
      >
        <AnnouncementBar />
        <AppLayout>{children}</AppLayout>
      </body>
    </html >
  );
}
