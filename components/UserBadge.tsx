import { UserRole } from "@/types";


interface UserBadgeProps {
    username: string;
    role: UserRole;
}

export default function UserBadge({ username, role }: UserBadgeProps) {
    const badgeStyle: React.CSSProperties = role === UserRole.ADMIN ? { backgroundColor: '#ef4444', color: 'white' } : { backgroundColor: '#6b7280', color: 'white' };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', color: '#374151' }}>{username}</span>
            <span style={{
                ...badgeStyle,
                padding: '2px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
            }}>
                {role}
            </span>
        </div>
    );
}