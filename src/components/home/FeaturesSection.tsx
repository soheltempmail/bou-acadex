import Link from "next/link";

const FEATURES = [
  {
    iconBg: "#ecfdf5",
    iconColor: "#149353",
    icon: "📖",
    title: "ই-বুক ও মডিউল লাইব্রেরি",
    description:
      "বাউবির সকল স্কুলের পূর্ণাঙ্গ পাঠ্যবই। ব্রাউজারে সরাসরি অনলাইনে পড়ুন অথবা অফলাইনে পড়ার জন্য সেভ করে রাখুন।",
    points: [
      "পূর্ণাঙ্গ সিলেবাসের পাঠ্যবই",
      "ইউনিটভিত্তিক স্মার্ট রিডার ভিউ",
      "মোবাইল ও ডার্ক-মোড ফ্রেন্ডলি",
    ],
    href: "/books",
    linkText: "ই-লাইব্রেরি ব্রাউজ করুন",
  },
  {
    iconBg: "#fef3c7",
    iconColor: "#f59e0b",
    icon: "📝",
    title: "বিগত বছরের প্রশ্ন ও উত্তর",
    description:
      "বিগত ৫-১০ বছরের টার্ম ফাইনাল পরীক্ষার প্রশ্নব্যাংক, সাথে অভিজ্ঞ শিক্ষকদের তৈরি নির্ভুল মডেল সমাধান ও নোটস।",
    points: [
      "১ম থেকে ৮ম সেমিস্টার পরীক্ষার প্রশ্ন",
      "ধাপভিত্তিক নির্ভুল সমাধান ও ডায়াগ্রাম",
      "কোর্স কোড দিয়ে দ্রুত ফিল্টারিং",
    ],
    href: "/questions",
    linkText: "প্রশ্নব্যাংক খুঁজুন",
  },
  {
    iconBg: "#fef2f2",
    iconColor: "#fe2601",
    icon: "⚡",
    title: "ইন্টারঅ্যাক্টিভ MCQ টেস্ট",
    description:
      "বাস্তব পরীক্ষার আবহে রিয়েল-টাইম টাইমার সহ মক টেস্ট দিন। তাৎক্ষণিক স্কোরকার্ড, নির্ভুলতা বিশ্লেষণ ও ব্যাখ্যা।",
    points: [
      "কাউন্টডাউন টাইমার ও সতর্কবার্তা",
      "তাৎক্ষণিক স্কোর ও সঠিক উত্তরের ব্যাখ্যা",
      "বিষয়ভিত্তিক আনলিমিটেড প্র্যাকটিস",
    ],
    href: "/mcq-test",
    linkText: "মক টেস্ট শুরু করুন",
  },
];

export function FeaturesSection() {
  return (
    <section className="section" id="featuresSection">
      <div className="container">
        <header className="section-header">
          <span className="section-kicker">একাডেমিক সেবা</span>
          <h2 className="section-title">বাউবি শিক্ষার্থীদের পূর্ণাঙ্গ সহায়তা প্ল্যাটফর্ম</h2>
          <p className="section-desc">
            বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের দূরশিক্ষণ পাঠ্যক্রমের আলোকে বিশেষায়িতভাবে তৈরি
            ডিজিটাল রিসোর্স।
          </p>
        </header>

        <div className="features-grid">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div
                className="feature-icon-badge"
                style={{ background: feature.iconBg, color: feature.iconColor }}
              >
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
              <ul className="feature-list">
                {feature.points.map((point) => (
                  <li key={point}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={feature.href} className="feature-link">
                {feature.linkText} <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
