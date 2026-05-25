'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await register({ email, username, password });
      // [Week 10] Replace with: router.push('/dashboard')
      // window.location.href = '/auth/login';
      router.push('/auth/login');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{ marginBottom: '4px', fontSize: '22px' }}>Register</h1>
        <p style={{ marginBottom: '24px', color: '#6b7280', fontSize: '14px' }}>
          Create an account to get started
        </p>

        {error && (
          <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px',
                      padding: '8px', backgroundColor: '#fef2f2', borderRadius: '4px' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email"
              style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db',
                       borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="username"
              style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db',
                       borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password"
              style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db',
                       borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%', padding: '10px',
              backgroundColor: isSubmitting ? '#9ca3af' : '#1d4ed8',
              color: 'white', border: 'none', borderRadius: '6px',
              fontSize: '14px', fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#1d4ed8' }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}