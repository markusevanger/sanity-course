// ...other imports
import { SanityLive } from "@/app/sanity/live";
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}