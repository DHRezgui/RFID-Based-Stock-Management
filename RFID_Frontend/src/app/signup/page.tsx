"use client";

import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import styles from "./page.module.css";
import { registerUser, RegisterData } from "../api/userService";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterData>({
    fullname: "",
    email: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "agree") {
      setAgree(checked);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("You must agree to the terms and policy.");
      return;
    }

    try {
      await registerUser(formData);
      alert("Registration successful!");
      router.push("/login");
    } catch (err: any) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className={styles.page}>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
          <div className="text-center mb-4">
            <img src="/assets/logo1.png" alt="Logo" width={40} />
            <h4>Create your account</h4>
            <small className="text-muted">Just a few details to get you started.</small>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="agree"
                label="I agree with the Terms of Service and Privacy Policy"
                checked={agree}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" className={`w-100 ${styles.customButton}`}>
              Sign Up
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small>
              Already have an account?{" "}
              <a href="/login" className={styles.customLink}>
                Login
              </a>
            </small>
          </div>
        </Card>
      </Container>
    </div>
  );
}
