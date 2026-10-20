const STATS = [
  {
    iconBg: "#ecfdf5",
    iconColor: "#149353",
    icon: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </>
    ),
    value: "১,২৪০+",
    label: "ই-বুক ও মডিউল",
  },
  {
    iconBg: "#fef2f2",
    iconColor: "#fe2601",
    icon: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    ),
    value: "১০+ বছর",
    label: "বিগত প্রশ্ন ও সমাধান",
  },
  {
    iconBg: "#fef3c7",
    iconColor: "#f59e0b",
    icon: (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </>
    ),
    value: "৪২০+",
    label: "ইন্টারঅ্যাক্টিভ MCQ টেস্ট",
  },
  {
    iconBg: "#e0f2fe",
    iconColor: "#0284c7",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </>
    ),
    value: "১৮,৫০০+",
    label: "সক্রিয় বাউবি শিক্ষার্থী",
  },
];

export function StatsBar() {
  return (
    <section className="stats-bar-section">
      <div className="container">
        <div className="stats-card-container">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div
                className="stat-icon-wrap"
                style={{ background: stat.iconBg, color: stat.iconColor }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {stat.icon}
                </svg>
              </div>
              <div>
                <div className="stat-val">{stat.value}</div>
                <div className="stat-text">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
