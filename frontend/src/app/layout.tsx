import { ReactNode } from "react";
import { Header } from "@/components/Header";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
