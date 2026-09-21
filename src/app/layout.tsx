import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "𝓡𝓮𝓪𝓭 𝓲𝓽 𝓪𝓷𝓭 𝓦𝓮𝓮𝓹",
  icons: "/sites/readitandweep-live-f1b7f8f1/root-8a5edab2/pinksparkle.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
