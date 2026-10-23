import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LegalNavTabs } from "@/components/layout/LegalNavTabs";

export const metadata: Metadata = {
  title: "API Reference & Developers | BOU Acadex",
  description:
    "HTTP API reference for the BOU Acadex academic hub: e-books, past questions, notices and MCQ banks.",
};

const ENDPOINTS = [
  {
    method: "GET",
    endpoint: "/api/books",
    description: (
      <>
        ই-বুক তালিকা ফিল্টার: <code>school</code>, <code>program</code>, <code>level</code>,{" "}
        <code>q</code>
      </>
    ),
  },
  {
    method: "GET",
    endpoint: "/api/questions",
    description: (
      <>
        বিগত প্রশ্ন ও মডেল সমাধান: <code>year</code>, <code>program</code>, <code>school</code>,{" "}
        <code>semester</code>, <code>q</code>
      </>
    ),
  },
  {
    method: "GET",
    endpoint: "/api/notices",
    description: <>পরীক্ষার নোটিশ ও রুটিন আপডেট</>,
  },
  {
    method: "GET",
    endpoint: "/api/mcq",
    description: <>উপলব্ধ MCQ বিষয়ের তালিকা</>,
  },
  {
    method: "GET",
    endpoint: "/api/mcq?subject=ict",
    description: <>নির্দিষ্ট বিষয়ের পূর্ণাঙ্গ প্রশ্নব্যাংক</>,
  },
  {
    method: "POST",
    endpoint: "/api/mcq",
    description: (
      <>
        MCQ পরীক্ষার স্বয়ংক্রিয় মূল্যায়ন: <code>{"{ subject, answers }"}</code>
      </>
    ),
  },
];

export default function ApiDocsPage() {
  return (
    <PageShell>
      <main className="section">
        <div className="container">
          <header className="section-header">
            <span className="section-kicker">ডেভেলপার রিসোর্স</span>
            <h1 className="section-title">BOU Acadex HTTP API</h1>
            <p className="section-desc">
              বাউবি স্টুডেন্ট হাবের পাবলিক JSON এন্ডপয়েন্টসমূহ। সকল রেসপন্স{" "}
              <code>{"{ success, data }"}</code> ফরম্যাটে প্রদান করা হয় এবং এক্সটার্নাল ক্লায়েন্টের
              জন্য CORS সক্রিয় রয়েছে।
            </p>
            <div style={{ marginTop: 20 }}>
              <LegalNavTabs current="api" />
            </div>
          </header>

          <div
            style={{
              overflowX: "auto",
              background: "var(--bg-surface-elevated)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.9rem",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "var(--bg-surface-muted)",
                    textAlign: "left",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <th style={{ padding: "14px 18px", fontWeight: 800 }}>Method</th>
                  <th style={{ padding: "14px 18px", fontWeight: 800 }}>Endpoint</th>
                  <th style={{ padding: "14px 18px", fontWeight: 800 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {ENDPOINTS.map((entry, index) => (
                  <tr
                    key={entry.method + entry.endpoint + index}
                    style={
                      index < ENDPOINTS.length - 1
                        ? { borderBottom: "1px solid var(--border-subtle)" }
                        : undefined
                    }
                  >
                    <td
                      style={{
                        padding: "14px 18px",
                        fontWeight: 800,
                        color:
                          entry.method === "GET" ? "var(--tms-green)" : "var(--tms-red)",
                      }}
                    >
                      {entry.method}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <code>{entry.endpoint}</code>
                    </td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>
                      {entry.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
