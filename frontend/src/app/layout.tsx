import { ReactNode } from "react";
import { Header } from "@/components/Header";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
