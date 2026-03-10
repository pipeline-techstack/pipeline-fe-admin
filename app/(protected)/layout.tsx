import type { Metadata } from "next";
import "../globals.css";
import { Sidebar } from "@/components/dashboard/sidebar";

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
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
