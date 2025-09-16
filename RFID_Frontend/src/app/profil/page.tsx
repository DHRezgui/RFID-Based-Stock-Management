"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
  sub: string; // email
  fullname: string;
  exp: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [userId, setUserId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);


useEffect(() => {
  const token = localStorage.getItem("authToken"); 
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log("Decoded token:", decoded);
      setUserId(decoded.id);
      setFormData({
        fullname: decoded.fullname || "",
        email: decoded.sub || "",
        password: "",
      });
    } catch (err) {
      console.error("Invalid token", err);
    }
  }
}, []);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const response = await fetch(`${API_URL}/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      setMessage(" Profile updated successfully");
      setFormData({ ...formData, password: "" });
    } catch (error) {
      setMessage(" Error updating profile");
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className={`${styles.card} card p-4 shadow`}>
              <h2 className="text-center mb-4">Edit Profile</h2>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">New Password (optional)</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <button type="submit" className={`btn w-100 ${styles.customButton}`}>
                  Save Changes
                </button>
              </form>
              <div className="text-center mt-3">
                <a href="/" className={styles.customLink}>Back to Home</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
