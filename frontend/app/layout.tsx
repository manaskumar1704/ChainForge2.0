import "./globals.css";
import { Providers } from "./providers";
import { ForgeBackground } from "../components/ForgeBackground";
import { metadata } from "./metadata";
import Link from "next/link";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-foreground">
        <Providers>
          <header className="py-4 px-8 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight text-neutral-300">
              ChainForge <span className="text-blue-400">2.0</span>
            </Link>
          </header>
          <ForgeBackground />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
