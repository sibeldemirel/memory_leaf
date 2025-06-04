'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupForm } from "./SignupForm";

export function SignupContainer() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleSignup(name: string, email: string, password: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Erreur lors de l'inscription");
        return;
      }

      setMessage("Inscription réussie !");
      router.push("/login");
    } catch (err) {
      console.error(err);
      setMessage("Erreur serveur");
    }
  }

  return <SignupForm onSignup={handleSignup} message={message} />;
}
