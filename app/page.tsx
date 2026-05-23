'use client';

import UserBadge from "@/components/UserBadge";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const {user, isLoading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [isLoading, user, router]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <p style={{ color: '#6b7280' }}>Redirecting...</p>
    </div>
  );
}