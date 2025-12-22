import "./globals.css";
import { Providers } from "./providers";
import { ForgeBackground } from "../components/ForgeBackground";
import { PageTransition } from "../components/PageTransition";
import { metadata } from "./metadata";

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
          <ForgeBackground />
          <PageTransition>{children}</PageTransition>
        </Providers>
      </body>
    </html>
  );
}
