'use client';

import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { ReportCategory } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewReportPage() {
    const {token, logout} = useAuth();
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!token) {
            router.push('/auth/login');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            await api.createReport({title, content, category}, token);
            router.push('/reports');
        } catch {
            setError('Failed to create report. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => router.push('/dashboard')}
                style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push('/reports')}
                style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
              >
                Back to Reports
              </button>
            </div>
            <button
              onClick={() => { logout(); router.push('/auth/login'); }}
              style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
            >
              Logout
            </button>
          </header>
    
          <main style={{ maxWidth: '700px', margin: '0 auto', padding: '32px' }}>
            <div style={{
              backgroundColor: 'white', padding: '32px', borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>
                Create New Report
              </h2>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
                Write details about the vulnerability you&apos;ve discovered.
              </p>
    
              {error && (
                <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px',
                            padding: '8px', backgroundColor: '#fef2f2', borderRadius: '4px' }}>
                  {error}
                </p>
              )}
    
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="title"
                    style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for your report"
                    required
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db',
                             borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
    
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="category"
                    style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ReportCategory)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db',
                             borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  >
                    <option value={ReportCategory.XSS}>XSS</option>
                    <option value={ReportCategory.CSRF}>CSRF</option>
                    <option value={ReportCategory.SQLI}>SQL Injection</option>
                    <option value={ReportCategory.OTHER}>Other</option>
                  </select>
                </div>
    
                <div style={{ marginBottom: '24px' }}>
                  <label htmlFor="content"
                    style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe the vulnerability in detail"
                    rows={10}
                    required
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db',
                             borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>
    
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: isSubmitting ? '#9ca3af' : '#1d4ed8',
                      color: 'white', border: 'none', borderRadius: '6px',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/reports')}
                    style={{ padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      );
}