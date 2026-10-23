import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { LegalNavTabs } from "@/components/layout/LegalNavTabs";

export const metadata: Metadata = {
  title: "আইনি অস্বীকৃতি ও গ্রন্থস্বত্ব | Disclaimer — BOU Acadex",
  description:
    "BOU Acadex-এর অনানুষ্ঠানিক অবস্থান, বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU) ও DCSA-এর বইয়ের কপিরাইট এবং আইনি অস্বীকৃতি সম্পর্কিত তথ্যাবলী।",
};

export default function DisclaimerPage() {
  return (
    <PageShell>
      <main className="section">
        <div className="container">
          <header className="doc-hero">
            <span className="section-kicker">আইনি বিবৃতি ও স্বত্বাধিকার</span>
            <h1 className="section-title">আইনি অস্বীকৃতি ও গ্রন্থস্বত্ব</h1>
            <p className="section-desc">
              অনানুষ্ঠানিক স্টুডেন্ট প্ল্যাটফর্মের রূপরেখা, বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU) এবং
              DCSA-এর পাঠ্যবই সংক্রান্ত কপিরাইট নীতি।
            </p>
            <LegalNavTabs current="disclaimer" />
          </header>

          <div className="doc-content-container">
            {/* Primary Disclaimer Box */}
            <div className="doc-alert-box">
              <div className="doc-alert-header">
                <span className="doc-alert-icon">⚖️</span>
                <span className="doc-alert-title">
                  অনানুষ্ঠানিক অবস্থান ও মেধা স্বত্ব সম্পর্কিত স্পষ্টীকরণ
                </span>
              </div>
              <div className="doc-alert-body">
                <p>
                  <strong>১. আমরা অনানুষ্ঠানিক (Unofficial Entity):</strong> BOU Acadex বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের
                  (Bangladesh Open University - BOU) কোনো অফিসিয়াল বা প্রাতিষ্ঠানিক ওয়েবসাইট নয়। এটি সম্পূর্ণ স্বাধীনভাবে
                  শিক্ষার্থীদের যৌথ উদ্যোগে তৈরি একটি অবাণিজ্যিক ডিজিটাল শিক্ষা সহায়ক হাব।
                </p>
                <p style={{ marginTop: 12 }}>
                  <strong>২. বইগুলো আমাদের নিজস্ব নয় (Books are from DCSA/BOU, NOT Ours):</strong> এই সাইটে প্রদর্শিত,
                  পড়ার সুবিধা দেওয়া বা লিংক করা সকল ই-বুক, টেক্সটবুক এবং কোর্স মডিউল <strong>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU)</strong> এবং
                  সংশ্লিষ্ট অনুষদ ও বিভাগ (যেমন: ডিপার্টমেন্ট অব কম্পিউটার সায়েন্স অ্যান্ড অ্যাপ্লিকেশন - DCSA, ওপেন স্কুল,
                  ব্যবসায় শিক্ষা স্কুল)-এর নিজস্ব সম্পদ। আমরা কোনো বইয়ের রচয়িতা বা স্বত্বাধিকারী নই।
                </p>
              </div>
            </div>

            {/* Detailed Clause 1: Book Sourcing & Fair Use */}
            <article className="doc-card">
              <h2>📖 বই ও স্টাডি মডিউল সংগ্রহ নীতি (DCSA & BOU Sourcing)</h2>
              <p>
                বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় দূরশিক্ষণের শিক্ষার্থীদের জন্য তাদের আনুষ্ঠানিক ই-বুক পোর্টাল
                (<code>ebookbou.edu.bd</code>) এবং মূল ওয়েব সার্ভারে বিনামূল্যে পড়ার উপযোগী ডিজিটাল পিডিএফ সংস্করণ উন্মুক্ত
                করে রেখেছে।
              </p>
              <p>
                BOU Acadex শিক্ষার্থীদের সুবিধার্থে সেই উন্মুক্ত পাবলিক লিংক ও আর্কাইভসমূহ এক ছাদের নিচে গোছানো
                ক্যাটালগ আকারে উপস্থাপন করে। যাতে শিক্ষার্থীরা ধীরগতির ইন্টারনেট বা জটিল নেভিগেশন ছাড়াই সহজে তাদের
                প্রয়োজনীয় বিষয়ের বই পড়তে পারেন।
              </p>

              <div className="doc-highlight-card">
                <p>
                  📌 <strong>ফেয়ার ইউজ (Fair Use Policy):</strong> সকল বই ও প্রশ্নপত্র শুধুমাত্র শিক্ষার্থীদের
                  অবাণিজ্যিক শিক্ষা ও ব্যক্তিগত অধ্যয়নের জন্য প্রদর্শিত হচ্ছে। কোনো বই বা মেটেরিয়াল বিক্রয়,
                  বাণিজ্যিক পুনরুৎপাদন বা আর্থিক লেনদেনের কাজে ব্যবহার করা কঠোরভাবে নিষিদ্ধ।
                </p>
              </div>
            </article>

            {/* Detailed Clause 2: Intellectual Property & Trademarks */}
            <article className="doc-card">
              <h2>🛡️ মেধা স্বত্ব, ট্রেডমার্ক ও লোগো সম্পর্কিত</h2>
              <ul>
                <li>
                  <strong>বাউবি লোগো ও নাম:</strong> &quot;বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়&quot;, &quot;Bangladesh Open University&quot;,
                  &quot;BOU&quot; এবং সংশ্লিষ্ট স্কুলের নাম ও মনোগ্রাম বিশ্ববিদ্যালয় কর্তৃপক্ষের আইনগত সম্পত্তি। এই নামসমূহ শুধুমাত্র
                  শনাক্তকরণ ও প্রাসঙ্গিক শিক্ষামূলক রেফারেন্স হিসেবে ব্যবহার করা হয়েছে।
                </li>
                <li>
                  <strong>লেখক ও প্যানেল স্বত্ব:</strong> প্রতিটি বইয়ের প্রণেতা, সম্পাদক, পরিমার্জক এবং কোর্স কো-অর্ডিনেটরগণের
                  মেধা স্বত্ব সম্পূর্ণ সংরক্ষিত।
                </li>
                <li>
                  <strong>BOU Acadex কোডবেস:</strong> সাইটের ইউজার ইন্টারফেস (UI), রেসপনসিভ ওয়েব ডিজাইন এবং কোড কাঠামো
                  আমাদের ওপেন সোর্স কন্ট্রিবিউটরদের কাজ, যা উন্মুক্তভাবে শিক্ষার্থীদের সেবায় নিয়োজিত।
                </li>
              </ul>
            </article>

            {/* Detailed Clause 3: No Administrative Authority */}
            <article className="doc-card">
              <h2>🚫 প্রাতিষ্ঠানিক দায়মুক্তি (Limitation of Liability)</h2>
              <p>
                যেহেতু BOU Acadex কোনো অফিসিয়াল মাধ্যম নয়:
              </p>
              <ol>
                <li>
                  এখানে প্রদর্শিত কোনো নোটিশ, পরীক্ষার সম্ভাব্য তারিখ বা সিলেবাস পরিবর্তন সংক্রান্ত তথ্যের চূড়ান্ত
                  বৈধতার জন্য শিক্ষার্থীকে অবশ্যই বিশ্ববিদ্যালয়ের অফিসিয়াল পোর্টাল (<code>bou.ac.bd</code>) অথবা
                  নিজ নিজ আঞ্চলিক বা উপ-আঞ্চলিক কেন্দ্রে যোগাযোগ করতে হবে।
                </li>
                <li>
                  অনানুষ্ঠানিক তথ্যের ওপর ভিত্তি করে কোনো শিক্ষার্থীর একাডেমিক বা ব্যক্তিগত ক্ষতির জন্য BOU Acadex
                  টিম দায়বদ্ধ থাকবে না।
                </li>
                <li>
                  ভর্তি, রেজিস্ট্রেশন, ফি প্রদান, টিউটোরিয়াল অ্যাসাইনমেন্ট জমা ও মূল সনদ সংক্রান্ত যেকোনো বিষয়ের জন্য
                  বাউবির অফিসিয়াল OSAPS ও পরীক্ষা সেবাই একমাত্র প্রামাণ্য মাধ্যম।
                </li>
              </ol>
            </article>

            {/* Detailed Clause 4: DMCA & Takedown Requests */}
            <article className="doc-card">
              <h2>📬 টেকডাউন অনুরোধ ও কপিরাইট যোগাযোগ (Notice & Takedown)</h2>
              <p>
                আমরা বুদ্ধিবৃত্তিক সম্পদ ও কপিরাইটের প্রতি সর্বোচ্চ শ্রদ্ধাশীল। বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়
                কর্তৃপক্ষ, DCSA বিভাগ, কোনো লেখক বা স্বত্বাধিকারী যদি এই সাইটে লিংক করা কোনো কনটেন্ট অপসারণ বা
                সংশোধন করতে চান, তবে আমরা তাত্ক্ষণিকভাবে তা কার্যকর করতে অঙ্গীকারবদ্ধ।
              </p>
              <p>
                যেকোনো প্রয়োজনে সরাসরি আমাদের সাথে যোগাযোগ করার জন্য অনুরোধ করা যাচ্ছে:
              </p>
              <div className="doc-info-grid">
                <div className="doc-info-item">
                  <h4>📧 ইমেইল যোগাযোগ</h4>
                  <p>
                    <a href="mailto:contact@bouacadex.org" style={{ color: "var(--tms-green)", fontWeight: 700 }}>
                      contact@bouacadex.org
                    </a>
                  </p>
                </div>
                <div className="doc-info-item">
                  <h4>🏛️ অফিসিয়াল বাউবি ওয়েবসাইট</h4>
                  <p>
                    <a href="https://bou.ac.bd" target="_blank" rel="noopener" style={{ color: "var(--tms-green)", fontWeight: 700 }}>
                      www.bou.ac.bd ↗
                    </a>
                  </p>
                </div>
              </div>
            </article>

            {/* Bottom Links */}
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link href="/terms" className="btn btn-outline" style={{ marginRight: 12 }}>
                ব্যবহারের শর্তাবলী দেখুন →
              </Link>
              <Link href="/about" className="btn btn-primary">
                আমাদের সম্পর্কে আরও জানুন →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
