import { AuthResponse, CVEItem, DashboardStatistics, LoginRequest, RegisterRequest, RegisterResponse } from "@/types";
import { Report } from "@/types";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function parseOrThrow(response: Response) {
    const text = await response.text();
    let body: unknown = null;

    try {
        body = text? JSON.parse(text): null;
    } catch {
        body = text;
    }
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    return body;
}

export const api = {
    async register(data: RegisterRequest): Promise<RegisterResponse> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return parseOrThrow(response) as Promise<RegisterResponse>;
    },

    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return parseOrThrow(response) as Promise<AuthResponse>;
    },

    async getDashboardStats(token: string): Promise<DashboardStatistics> {
        const response = await fetch(`${API_URL}/dashboard/statistics`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return parseOrThrow(response) as Promise<DashboardStatistics>;
    },

    async getRecentCVEs(token: string, limit: number = 5): Promise<CVEItem[]> {
        const response = await fetch(`${API_URL}/dashboard/cves/recent?limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return parseOrThrow(response) as Promise<CVEItem[]>;
    },

    async getReports(token: string): Promise<Report[]> {
        const response = await fetch(`${API_URL}/reports`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return parseOrThrow(response) as Promise<Report[]>;
    },

    async getReport(id: number, token: string): Promise<Report> {
        const response = await fetch(`${API_URL}/reports/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return parseOrThrow(response) as Promise<Report>;
    },

    async createReport(
        data: {title: string, content: string, category: string},
        token: string,
    ): Promise<Report> {
        const response = await fetch(`${API_URL}/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return parseOrThrow(response) as Promise<Report>;
    }
}