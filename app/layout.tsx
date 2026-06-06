import './globals.css';
import { connectDB } from '@/lib/db';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectDB();

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}