import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/provider";

export const metadata: Metadata = {
  title: "scroller app",
  description: "watch and create reels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="flex justify-center items-center h-screen">
           {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}