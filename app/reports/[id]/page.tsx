'use client';

import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Report } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const badgeStyle = {
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '12px',
} as const;

export default function ReportDetailPage() {
  const { token, isLoading, logout } = useAuth();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isLoading) return;

    if (!token) {
      router.push('/auth/login');
      return;
    }

    const reportId = Number(id);
    if (!Number.isInteger(reportId)) {
      setError('Invalid report id.');
      return;
    }

    api.getReport(reportId, token)
      .then(setReport)
      .catch(() => setError('Failed to load report.'));
  }, [id, isLoading, router, token]);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  if (isLoading || (!report && !error)) {
    return (
      <div style={{ padding: '40px' }}>
        <p style={{ color: '#6b7280' }}>Loading report...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
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
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => router.push('/reports')}
            style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
          >
            Back to Reports
          </button>
          <button
            onClick={handleLogout}
            style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px' }}>
        {error ? (
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#ef4444' }}>{error}</p>
          </div>
        ) : report && (
          <article style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{report.title}</h2>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                <span style={{ ...badgeStyle, backgroundColor: '#e5e7eb' }}>{report.category}</span>
                <span style={{ ...badgeStyle, backgroundColor: '#dbeafe', color: '#1d4ed8' }}>{report.status}</span>
                <span style={{ ...badgeStyle, backgroundColor: '#fecaca', color: '#b91c1c' }}>{report.severity}</span>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '24px' }}>
              Submitted: {new Date(report.createdAt).toLocaleDateString('ko-KR')}
            </p>

            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#374151' }}>
              {report.content}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
