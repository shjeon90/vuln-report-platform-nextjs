'use client';

import UserBadge from "@/components/UserBadge";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { CVEItem, DashboardStatistics } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const {user, token, logout} = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStatistics | null>(null);
    const [cves, setCves] = useState<CVEItem[]>([]);

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
            return;
        }

        api.getDashboardStats(token).then(setStats);
        api.getRecentCVEs(token).then(setCves);
    }, [token, router]);

    const handleLogout = () => {
        logout();
        window.location.href = '/auth/login';
    };

    if (!stats) {
        return (
            <div style={{ padding: '40px' }}>
                <p style={{ color: '#6b7280' }}>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
          {/* Header */}
          <header style={{
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Vulnerability Reporting Platform
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => router.push('/reports')}
                style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
              >
                Reports
              </button>
              <span style={{ fontSize: '14px', color: '#374151' }}>{user?.username}</span>
              <span style={{
                padding: '2px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
                backgroundColor: user?.role === 'ADMIN' ? '#ef4444' : '#6b7280', color: 'white',
              }}>
                {user?.role}
              </span>
              <button
                onClick={handleLogout}
                style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
              >
                Logout
              </button>
            </div>
          </header>
    
          <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Dashboard</h2>
    
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Total Reports', value: stats.totalReports },
                { label: 'Submitted', value: stats.submittedReports },
                { label: 'In Review', value: stats.inReviewReports },
                { label: 'Approved', value: stats.approvedReports },
              ].map((card) => (
                <div key={card.label} style={{
                  backgroundColor: 'white', padding: '20px', borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{card.label}</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{card.value}</p>
                </div>
              ))}
            </div>
    
            {/* Reports by Category */}
            <div style={{
              backgroundColor: 'white', padding: '24px', borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
                Category for Reported Vulnerabilities
              </h3>
              {stats.reportsByCategory.map((item) => (
                <div key={item.category} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0', borderBottom: '1px solid #f3f4f6',
                }}>
                  <span>{item.category}</span>
                  <span style={{
                    padding: '2px 10px', backgroundColor: '#e5e7eb',
                    borderRadius: '12px', fontSize: '13px',
                  }}>{item.count}</span>
                </div>
              ))}
            </div>
    
            {/* Recent CVEs */}
            <div style={{
              backgroundColor: 'white', padding: '24px', borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Recent CVE</h3>
              {cves.map((cve) => (
                <div key={cve.id} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600' }}>{cve.id}</span>
                    {cve.severity && (
                      <span style={{
                        padding: '2px 8px', backgroundColor: '#fecaca',
                        color: '#b91c1c', borderRadius: '4px', fontSize: '12px',
                      }}>{cve.severity}</span>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>{cve.description}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      );
}