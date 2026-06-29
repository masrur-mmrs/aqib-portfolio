"use client";

import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button, TextInput } from "flowbite-react";
import { app } from "@/index";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = async () => {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    await axios.post(
      "/api/login",
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const mutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Login error:", error);
      setLoginMessage("Login failed. Please check your credentials.");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoginMessage("");
    mutation.mutate();
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {mutation.isPending && <p>Logging in...</p>}
      {mutation.isSuccess && <p>Logged in! Redirecting…</p>}
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Email address"
        />
        <br />
        <TextInput
          required
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          minLength={8}
        />
        <Button
          type="submit"
          color="blue"
          className="mt-3 w-full"
          disabled={mutation.isPending}
        >
          Log In
        </Button>
      </form>
      {loginMessage && <p className="mt-3 text-red-500">{loginMessage}</p>}
    </div>
  );
}

export default LoginPage;