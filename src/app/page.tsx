const endpoints = [
  { method: "GET", path: "/api/books", description: "E-books with filters: school, program, level, q" },
  { method: "GET", path: "/api/questions", description: "Past papers: year, program, school, semester, q" },
  { method: "GET", path: "/api/suggestions", description: "Suggestions: program, school, semester, priority, q" },
  { method: "GET", path: "/api/notices", description: "Academic notices" },
  { method: "GET", path: "/api/mcq", description: "Available MCQ subject banks" },
  { method: "GET", path: "/api/mcq?subject=ict", description: "Full MCQ bank for a subject" },
  { method: "POST", path: "/api/mcq", description: "Auto-evaluate a submission: { subject, answers }" },
];

export default function HomePage() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "48px 24px", maxWidth: 780, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>BOU Acadex API</h1>
      <p style={{ color: "#475569", marginBottom: 32 }}>
        Next.js TypeScript backend for the BOU Acadex student hub. The static frontend in
        <code>frontend/</code> consumes these endpoints.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {endpoints.map((endpoint) => (
            <tr key={`${endpoint.method}-${endpoint.path}`} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "12px 8px", fontWeight: 700 }}>{endpoint.method}</td>
              <td style={{ padding: "12px 8px" }}>
                <code>{endpoint.path}</code>
              </td>
              <td style={{ padding: "12px 8px", color: "#475569" }}>{endpoint.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
