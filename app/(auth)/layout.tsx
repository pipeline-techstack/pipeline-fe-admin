import "../globals.css"

export const metadata = {
  title: "Pipeline Super Admin",
  description: "Pipeline superadmin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
