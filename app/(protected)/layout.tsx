import type { Metadata } from "next";
import "../globals.css";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export const metadata: Metadata = {
  title: "Pipeline Admin",
  description: "Admin app for Pipeline.ai",
  generator: "admin.addpipeline.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex bg-gray-50 h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex flex-col flex-1 bg-gray-50 h-full overflow-hidden">
              <div className="flex-1 overflow-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
