'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errMsg = "Login failed";
        try {
          const errData = await response.json();
          errMsg = errData.message || errMsg;
        } catch (_) {
          
        }
        setError(errMsg);
        return;
      }

      const data = await response.json();
      console.log("Token reçu :", data.token);
      localStorage.setItem("authToken", data.token);

      router.push("/"); // Redirection vers la page d’accueil
    } catch (error) {
      console.error("Erreur réseau :", error);
      setError("Network error");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.loginButton}>Log In</button>
        </form>
        <div className="text-center mt-3">
          <small>
            You don't have an account? <a href="/signup" className={styles.customLink}>Sign Up</a>
          </small>
        </div>
      </div>
    </div>
  );
}
