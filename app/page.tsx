'use client';

import UserBadge from "@/components/UserBadge";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '40px' }}>
      <h1>Vulnerability Reporting Platform</h1>
      {user ? (
        <UserBadge username={user.username} role={user.role} />
      ) : (
        <p style={{ color: '#6b7280' }}>Not logged in.</p>
      )}
    </div>
  );
}
