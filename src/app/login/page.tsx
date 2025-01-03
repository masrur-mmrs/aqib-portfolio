'use client';

import  React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, TextInput } from 'flowbite-react';
import { app } from '@/index';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');
  
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoginMessage('');

    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch('/api/login', {
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      });

      if (response.ok) {
        router.refresh();
      } else {
        const errorData = await response.json();
        setLoginMessage(`Login failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage('Login failed. Please check your credentials.');
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
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
          color='blue'
          className="mt-3 w-full"
        >
          Log In
        </Button>
      </form>
      {loginMessage && <p className="mt-3 text-red-500">{loginMessage}</p>}
    </div>
  );
}

export default LoginPage;