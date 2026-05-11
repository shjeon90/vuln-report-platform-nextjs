
export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface User {
    id: number;
    email: string;
    username: string;
    role: UserRole;
    createdAt: string;
}

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

export interface RegisterResponse {
    id: number;
    email: string;
    username: string;
    role: UserRole;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}

export interface DashboardStatistics {
    totalReports: number;
    submittedReports: number;
    inReviewReports: number;
    approvedReports: number;
    rejectedReports: number;
    reportsByCategory: { category: string; count: number }[];
    reportsBySeverity: { severity: string; count: number }[];
}

export interface CVEItem {
    id: string;
    description: string;
    published: string;
    severity?: string;
}