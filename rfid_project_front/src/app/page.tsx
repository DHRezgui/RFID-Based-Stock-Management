'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import styles from "./page.module.css";

interface JwtPayload {
  exp: number;
}

function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/signup");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("authToken");
        router.push("/signup");
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      router.push("/signup");
    }
  }, [router]);

  return (
    <div className={styles.page}>
      <a href="/profil" aria-label="User logo" className={styles.userLogo}>
        <Image
          src="/assets/user2.png"
          alt="User"
          width={40}
          height={40}
          priority
        />
      </a>
      <main className={styles.main}>
        <h1 className={styles.heading}>
          Welcome to <span className={styles.highlight}>UPtech</span> — Your gateway to smart solutions
        </h1>
        <div className={styles.ctas}>
          <a href="/products" className={styles.primary}>Show Products</a>
          <a href="/tags" className={styles.secondary}>See RFID Tags</a>
        </div>
      </main>
      <a href="https://www.uptech.com.tn/" aria-label="UPtech logo" className={styles.logo}>
        <Image
          src="/assets/logo1.png"
          alt="UPtech Logo"
          width={40}
          height={40}
          priority
        />
      </a>
    </div>
  );
}

export default Home;