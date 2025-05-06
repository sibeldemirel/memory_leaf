import { ReactNode } from "react";
import { Header } from "@/components/Header";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-neutral-200 text-neutral-900">
        <Header />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
