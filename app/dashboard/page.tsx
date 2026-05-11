'use client';

import UserBadge from "@/components/UserBadge";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
    const {user, logout} = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/auth/login';
    };

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Dashboard</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {user && <UserBadge username={user.username} role={user.role} />}
                    <button onClick={handleLogout} style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            </div>
            <p style={{color: '#6b7280'}}>Dashboard content will be added in the next step.</p>
        </div>
    );
}