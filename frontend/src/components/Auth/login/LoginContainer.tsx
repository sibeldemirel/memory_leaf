'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "./LoginForm";

export function LoginContainer() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { login } = useAuth();

  async function handleLogin(email: string, password: string) {
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Échec de la connexion");
      }

      login(data.token);
      router.push("/decks");
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    }
  }

  return <LoginForm onSubmit={handleLogin} error={error} />;
}