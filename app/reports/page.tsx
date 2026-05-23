'use client';

import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Report } from "@/types";

export default function ReportsPage() {
    const {token, logout} = useAuth();
    const router = useRouter();
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
            return;
        }

        api.getReports(token).then(setReports);
    }, [token, router]);

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
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => router.push('/dashboard')}
                style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
              >
                Dashboard
              </button>
              <button
                onClick={() => { logout(); router.push('/auth/login'); }}
                style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
              >
                Logout
              </button>
            </div>
          </header>
    
          <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                  Reported Vulnerabilities
                </h2>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>Total {reports.length} reports</p>
              </div>
              <button
                onClick={() => router.push('/reports/new')}
                style={{
                  padding: '10px 20px', backgroundColor: '#1d4ed8',
                  color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer',
                }}
              >
                Write New Report
              </button>
            </div>
    
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {reports.map((report) => (
                <div
                  key={report.id}
                  style={{
                    backgroundColor: 'white', padding: '20px', borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer',
                  }}
                  onClick={() => router.push('/reports/' + report.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3 style={{ fontWeight: '600', fontSize: '16px' }}>{report.title}</h3>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ padding: '2px 8px', backgroundColor: '#e5e7eb', borderRadius: '4px', fontSize: '12px' }}>
                        {report.category}
                      </span>
                      <span style={{ padding: '2px 8px', backgroundColor: '#dbeafe', color: '#1d4ed8', borderRadius: '4px', fontSize: '12px' }}>
                        {report.status}
                      </span>
                      <span style={{ padding: '2px 8px', backgroundColor: '#fecaca', color: '#b91c1c', borderRadius: '4px', fontSize: '12px' }}>
                        {report.severity}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                    {report.content.slice(0, 100)}{report.content.length > 100 ? '...' : ''}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                    Submitted: {new Date(report.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              ))}
            </div>
          </main>
        </div>
      );
}