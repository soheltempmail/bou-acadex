import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { LegalNavTabs } from "@/components/layout/LegalNavTabs";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | About Us — BOU Acadex (Unofficial)",
  description:
    "BOU Acadex সম্পর্কে জানুন — বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় শিক্ষার্থীদের একটি অনানুষ্ঠানিক, সম্পূর্ণ অবাণিজ্যিক ডিজিটাল শিক্ষা সহায়ক উদ্যোগ।",
};

export default function AboutPage() {
  return (
    <PageShell>
      <main className="section">
        <div className="container">
          <header className="doc-hero">
            <span className="section-kicker">স্টুডেন্ট ইনিশিয়েটিভ</span>
            <h1 className="section-title">আমাদের সম্পর্কে (About Us)</h1>
            <p className="section-desc">
              বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের দূরশিক্ষণ শিক্ষার্থীদের জন্য একটি উন্মুক্ত,
              সহজগম্য এবং সমন্বিত ডিজিটাল একাডেমিক হাব।
            </p>
            <LegalNavTabs current="about" />
          </header>

          <div className="doc-content-container">
            {/* Critical Unofficial & Book Ownership Alert */}
            <div className="doc-alert-box">
              <div className="doc-alert-header">
                <span className="doc-alert-icon">⚠️</span>
                <span className="doc-alert-title">
                  জরুরি ঘোষণা: আমরা বাউবির কোনো অফিসিয়াল প্ল্যাটফর্ম নই
                </span>
              </div>
              <div className="doc-alert-body">
                <p>
                  <strong>১. সম্পূর্ণ অনানুষ্ঠানিক উদ্যোগ:</strong> BOU Acadex বাংলাদেশ উন্মুক্ত
                  বিশ্ববিদ্যালয় (Bangladesh Open University - BOU) কর্তৃপক্ষের কোনো অফিসিয়াল,
                  অনুমোদিত বা পরিচালিত ওয়েবসাইট নয়। এটি সাধারণ শিক্ষার্থীদের স্বতঃস্ফূর্ত প্রচেষ্টায়
                  তৈরি একটি স্বাধীন স্টুডেন্ট কমিউনিটি প্রজেক্ট।
                </p>
                <p style={{ marginTop: 10 }}>
                  <strong>২. বই ও মডিউলের স্বত্ব আমাদের নয়:</strong> এই প্ল্যাটফর্মে তালিকাভুক্ত সকল
                  ই-বুক, পাঠ্যবই এবং কোর্স মডিউল <strong>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU)</strong> এবং
                  সংশ্লিষ্ট স্কুল/বিভাগ (যেমন: কম্পিউটার সায়েন্স অ্যান্ড অ্যাপ্লিকেশন - DCSA, ওপেন স্কুল,
                  ব্যবসায় শিক্ষা স্কুল)-এর নিজস্ব সম্পদ। দূরশিক্ষণ শিক্ষার্থীদের সহায়তার সুবিধার্থে এগুলো
                  বাউবির উন্মুক্ত ই-বুক আর্কাইভ (<code>ebookbou.edu.bd</code>) থেকে সরাসরি যুক্ত করা হয়েছে।
                  BOU Acadex কোনো বইয়ের স্বত্ব বা কপিরাইট দাবি করে না।
                </p>
              </div>
            </div>

            {/* Section 1: Who We Are & Why BOU Acadex */}
            <article className="doc-card">
              <h2>💡 আমরা কারা এবং কেন এই উদ্যোগ?</h2>
              <p>
                বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (বাউবি) দেশের ৬৪টি জেলা ও প্রত্যন্ত অঞ্চলের লাখ লাখ কর্মজীবী,
                নারী ও বিকল্পধারার শিক্ষার্থীদের উচ্চশিক্ষার স্বপ্ন পূরণ করে চলেছে। তবে উন্মুক্ত দূরশিক্ষণের
                স্বভাবজাত কারণে শিক্ষার্থীদের মধ্যে অনেক সময় প্রাতিষ্ঠানিক তথ্য আদান-প্রদান ও রিসোর্স পাওয়ার ক্ষেত্রে
                কিছুটা দূরত্ব তৈরি হয়।
              </p>
              <p>
                সেই দূরত্ব ঘোচাতে <strong>BOU Acadex</strong> একটি অলাভজনক ও অবাণিজ্যিক স্টুডেন্ট পোর্টাল হিসেবে
                কাজ করে। আমাদের লক্ষ্য হলো দূরশিক্ষণের শিক্ষার্থীদের এক ঠিকানায় পাঠ্যবই পড়ার সুযোগ, বিগত বছরের
                পরীক্ষার প্রশ্ন অনুশীলন এবং তাৎক্ষণিক সেলফ-অ্যাসেসমেন্ট MCQ টেস্ট দেওয়ার সুযোগ করে দেওয়া।
              </p>

              <div className="doc-highlight-card">
                <p>
                  🎯 <strong>আমাদের অঙ্গীকার:</strong> এই প্ল্যাটফর্ম ১০০% বিনামূল্যে সবার জন্য উন্মুক্ত। এখানে কোনো
                  সাবস্ক্রিপশন ফি, হিডেন চার্জ বা বাণিজ্যিক পেইড কনটেন্ট নেই এবং ভবিষ্যতেও থাকবে না।
                </p>
              </div>
            </article>

            {/* Section 2: What We Offer */}
            <article className="doc-card">
              <h2>📚 আমরা শিক্ষার্থীদের কী সুবিধা দিচ্ছি?</h2>
              <p>BOU Acadex-এ শিক্ষার্থীরা পাচ্ছেন আধুনিক ও মোবাইল-বান্ধব বেশ কিছু ডিজিটাল সুবিধা:</p>

              <div className="doc-info-grid">
                <div className="doc-info-item">
                  <h4>📖 গোছানো ই-বুক রিডার</h4>
                  <p>
                    DCSA, SSC, HSC, BBA সহ বিভিন্ন প্রোগ্রামের বাউবি অফিসিয়াল বই এক ক্লিকে ডাউনলোড না করেই
                    ব্রাউজারে সহজে পড়ার সুবিধা।
                  </p>
                </div>

                <div className="doc-info-item">
                  <h4>📝 বিগত বছরের প্রশ্নব্যাংক</h4>
                  <p>
                    সেমিস্টার ও বিষয়ভিত্তিক বিগত পরীক্ষার প্রশ্নপত্র এবং রেফারেন্স সমাধান, যা পরীক্ষার পূর্ণাঙ্গ
                    প্রস্তুতিতে সহায়ক।
                  </p>
                </div>

                <div className="doc-info-item">
                  <h4>⚡ লাইভ MCQ টেস্ট এরিনা</h4>
                  <p>
                    বাউবি প্রশ্নের প্যাটার্ন অনুযায়ী তাৎক্ষণিক স্কোরবোর্ড ও ভুল উত্তরের সঠিক ব্যাখ্যাসহ ইন্টারঅ্যাক্টিভ
                    মক টেস্ট।
                  </p>
                </div>

                <div className="doc-info-item">
                  <h4>📢 একাডেমিক আপডেট ও নোটিশ</h4>
                  <p>
                    পরীক্ষার রুটিন, অ্যাসাইনমেন্ট ডেডলাইন ও ফলাফল সংক্রান্ত অফিসিয়াল নোটিশের সহজ সারসংক্ষেপ।
                  </p>
                </div>
              </div>
            </article>

            {/* Section 3: Official Verification Reminder */}
            <article className="doc-card">
              <h2>🏛️ অফিসিয়াল তথ্যের জন্য বাউবি মূল পোর্টাল ব্যবহার করুন</h2>
              <p>
                আমরা যেহেতু অনানুষ্ঠানিক কমিউনিটি হাব, তাই যেকোনো ভর্তি (Admission), ফি প্রদান (Fee Payment),
                রেজিস্ট্রেশন, প্রবেশপত্র (Admit Card) এবং মূল গ্রেডশিট ও ফলাফলের জন্য শিক্ষার্থীদের সরাসরি
                বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের প্রাতিষ্ঠানিক পোর্টাল ব্যবহারের অনুরোধ করা হচ্ছে:
              </p>

              <ul>
                <li>
                  <strong>মূল ওয়েবসাইট:</strong>{" "}
                  <a href="https://bou.ac.bd" target="_blank" rel="noopener" style={{ color: "var(--tms-green)" }}>
                    bou.ac.bd ↗
                  </a>
                </li>
                <li>
                  <strong>ভর্তি ও স্টুডেন্ট সেবা (OSAPS):</strong>{" "}
                  <a href="https://osapsnew.bou.ac.bd" target="_blank" rel="noopener" style={{ color: "var(--tms-green)" }}>
                    osapsnew.bou.ac.bd ↗
                  </a>
                </li>
                <li>
                  <strong>অফিসিয়াল ই-বুক সংগ্রহশালা:</strong>{" "}
                  <a href="https://ebookbou.edu.bd" target="_blank" rel="noopener" style={{ color: "var(--tms-green)" }}>
                    ebookbou.edu.bd ↗
                  </a>
                </li>
                <li>
                  <strong>পরীক্ষার ফলাফল পোর্টাল:</strong>{" "}
                  <a href="https://result.bou.ac.bd" target="_blank" rel="noopener" style={{ color: "var(--tms-green)" }}>
                    result.bou.ac.bd ↗
                  </a>
                </li>
              </ul>

              <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/beta/disclaimer" className="btn btn-outline" style={{ fontSize: "0.875rem" }}>
                  আইনি অস্বীকৃতি পড়ুন →
                </Link>
                <Link href="/beta/terms" className="btn btn-outline" style={{ fontSize: "0.875rem" }}>
                  ব্যবহারের শর্তাবলী দেখুন →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
