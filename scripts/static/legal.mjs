import { layout, legalTabs } from "./lib.mjs";

function docPage({ title, description, kicker, heading, intro, current, content }) {
  const body = `<main class="section">
  <div class="container">
    <header class="doc-hero">
      <span class="section-kicker">${kicker}</span>
      <h1 class="section-title">${heading}</h1>
      <p class="section-desc">${intro}</p>
      ${legalTabs(current)}
    </header>
    <div class="doc-content-container">${content}</div>
  </div>
</main>`;

  return layout({ title, description, body });
}

export function aboutPage() {
  return docPage({
    title: "আমাদের সম্পর্কে | About Us — BOU Acadex (Unofficial)",
    description:
      "BOU Acadex সম্পর্কে জানুন — বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় শিক্ষার্থীদের একটি অনানুষ্ঠানিক, সম্পূর্ণ অবাণিজ্যিক ডিজিটাল শিক্ষা সহায়ক উদ্যোগ।",
    kicker: "স্টুডেন্ট ইনিশিয়েটিভ",
    heading: "আমাদের সম্পর্কে (About Us)",
    intro:
      "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের দূরশিক্ষণ শিক্ষার্থীদের জন্য একটি উন্মুক্ত, সহজগম্য এবং সমন্বিত ডিজিটাল একাডেমিক হাব।",
    current: "about",
    content: `
      <div class="doc-alert-box">
        <div class="doc-alert-header"><span class="doc-alert-icon">⚠️</span><span class="doc-alert-title">জরুরি ঘোষণা: আমরা বাউবির কোনো অফিসিয়াল প্ল্যাটফর্ম নই</span></div>
        <div class="doc-alert-body">
          <p><strong>১. সম্পূর্ণ অনানুষ্ঠানিক উদ্যোগ:</strong> BOU Acadex বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (Bangladesh Open University - BOU) কর্তৃপক্ষের কোনো অফিসিয়াল, অনুমোদিত বা পরিচালিত ওয়েবসাইট নয়। এটি সাধারণ শিক্ষার্থীদের স্বতঃস্ফূর্ত প্রচেষ্টায় তৈরি একটি স্বাধীন স্টুডেন্ট কমিউনিটি প্রজেক্ট।</p>
          <p style="margin-top:10px"><strong>২. বই ও মডিউলের স্বত্ব আমাদের নয়:</strong> এই প্ল্যাটফর্মে তালিকাভুক্ত সকল ই-বুক, পাঠ্যবই এবং কোর্স মডিউল <strong>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU)</strong> এবং সংশ্লিষ্ট স্কুল/বিভাগ (যেমন: কম্পিউটার সায়েন্স অ্যান্ড অ্যাপ্লিকেশন - DCSA, ওপেন স্কুল, ব্যবসায় শিক্ষা স্কুল)-এর নিজস্ব সম্পদ। দূরশিক্ষণ শিক্ষার্থীদের সহায়তার সুবিধার্থে এগুলো বাউবির উন্মুক্ত ই-বুক আর্কাইভ (<code>ebookbou.edu.bd</code>) থেকে সরাসরি যুক্ত করা হয়েছে। BOU Acadex কোনো বইয়ের স্বত্ব বা কপিরাইট দাবি করে না।</p>
        </div>
      </div>

      <article class="doc-card">
        <h2>💡 আমরা কারা এবং কেন এই উদ্যোগ?</h2>
        <p>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (বাউবি) দেশের ৬৪টি জেলা ও প্রত্যন্ত অঞ্চলের লাখ লাখ কর্মজীবী, নারী ও বিকল্পধারার শিক্ষার্থীদের উচ্চশিক্ষার স্বপ্ন পূরণ করে চলেছে। তবে উন্মুক্ত দূরশিক্ষণের স্বভাবজাত কারণে শিক্ষার্থীদের মধ্যে অনেক সময় প্রাতিষ্ঠানিক তথ্য আদান-প্রদান ও রিসোর্স পাওয়ার ক্ষেত্রে কিছুটা দূরত্ব তৈরি হয়।</p>
        <p>সেই দূরত্ব ঘোচাতে <strong>BOU Acadex</strong> একটি অলাভজনক ও অবাণিজ্যিক স্টুডেন্ট পোর্টাল হিসেবে কাজ করে। আমাদের লক্ষ্য হলো দূরশিক্ষণের শিক্ষার্থীদের এক ঠিকানায় পাঠ্যবই পড়ার সুযোগ, বিগত বছরের পরীক্ষার প্রশ্ন অনুশীলন এবং তাৎক্ষণিক সেলফ-অ্যাসেসমেন্ট MCQ টেস্ট দেওয়ার সুযোগ করে দেওয়া।</p>
        <div class="doc-highlight-card"><p>🎯 <strong>আমাদের অঙ্গীকার:</strong> এই প্ল্যাটফর্ম ১০০% বিনামূল্যে সবার জন্য উন্মুক্ত। এখানে কোনো সাবস্ক্রিপশন ফি, হিডেন চার্জ বা বাণিজ্যিক পেইড কনটেন্ট নেই এবং ভবিষ্যতেও থাকবে না।</p></div>
      </article>

      <article class="doc-card">
        <h2>📚 আমরা শিক্ষার্থীদের কী সুবিধা দিচ্ছি?</h2>
        <p>BOU Acadex-এ শিক্ষার্থীরা পাচ্ছেন আধুনিক ও মোবাইল-বান্ধব বেশ কিছু ডিজিটাল সুবিধা:</p>
        <div class="doc-info-grid">
          <div class="doc-info-item"><h4>📖 গোছানো ই-বুক রিডার</h4><p>DCSA, SSC, HSC, BBA সহ বিভিন্ন প্রোগ্রামের বাউবি অফিসিয়াল বই এক ক্লিকে ডাউনলোড না করেই ব্রাউজারে সহজে পড়ার সুবিধা।</p></div>
          <div class="doc-info-item"><h4>📝 বিগত বছরের প্রশ্নব্যাংক</h4><p>সেমিস্টার ও বিষয়ভিত্তিক বিগত পরীক্ষার প্রশ্নপত্র এবং রেফারেন্স সমাধান, যা পরীক্ষার পূর্ণাঙ্গ প্রস্তুতিতে সহায়ক।</p></div>
          <div class="doc-info-item"><h4>⚡ লাইভ MCQ টেস্ট এরিনা</h4><p>বাউবি প্রশ্নের প্যাটার্ন অনুযায়ী তাৎক্ষণিক স্কোরবোর্ড ও ভুল উত্তরের সঠিক ব্যাখ্যাসহ ইন্টারঅ্যাক্টিভ মক টেস্ট।</p></div>
          <div class="doc-info-item"><h4>📢 একাডেমিক আপডেট ও নোটিশ</h4><p>পরীক্ষার রুটিন, অ্যাসাইনমেন্ট ডেডলাইন ও ফলাফল সংক্রান্ত অফিসিয়াল নোটিশের সহজ সারসংক্ষেপ।</p></div>
        </div>
      </article>

      <article class="doc-card">
        <h2>🏛️ অফিসিয়াল তথ্যের জন্য বাউবি মূল পোর্টাল ব্যবহার করুন</h2>
        <p>আমরা যেহেতু অনানুষ্ঠানিক কমিউনিটি হাব, তাই যেকোনো ভর্তি (Admission), ফি প্রদান (Fee Payment), রেজিস্ট্রেশন, প্রবেশপত্র (Admit Card) এবং মূল গ্রেডশিট ও ফলাফলের জন্য শিক্ষার্থীদের সরাসরি বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের প্রাতিষ্ঠানিক পোর্টাল ব্যবহারের অনুরোধ করা হচ্ছে:</p>
        <ul>
          <li><strong>মূল ওয়েবসাইট:</strong> <a href="https://bou.ac.bd" target="_blank" rel="noopener" style="color:var(--tms-green)">bou.ac.bd ↗</a></li>
          <li><strong>ভর্তি ও স্টুডেন্ট সেবা (OSAPS):</strong> <a href="https://osapsnew.bou.ac.bd" target="_blank" rel="noopener" style="color:var(--tms-green)">osapsnew.bou.ac.bd ↗</a></li>
          <li><strong>অফিসিয়াল ই-বুক সংগ্রহশালা:</strong> <a href="https://ebookbou.edu.bd" target="_blank" rel="noopener" style="color:var(--tms-green)">ebookbou.edu.bd ↗</a></li>
          <li><strong>পরীক্ষার ফলাফল পোর্টাল:</strong> <a href="https://result.bou.ac.bd" target="_blank" rel="noopener" style="color:var(--tms-green)">result.bou.ac.bd ↗</a></li>
        </ul>
        <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
          <a href="/disclaimer/" class="btn btn-outline" style="font-size:0.875rem">আইনি অস্বীকৃতি পড়ুন →</a>
          <a href="/terms/" class="btn btn-outline" style="font-size:0.875rem">ব্যবহারের শর্তাবলী দেখুন →</a>
        </div>
      </article>`,
  });
}

export function termsPage() {
  return docPage({
    title: "ব্যবহারের শর্তাবলী | Terms & Conditions — BOU Acadex",
    description:
      "BOU Acadex ব্যবহারের নিয়মাবলী ও শর্তসমূহ: অনানুষ্ঠানিক প্ল্যাটফর্ম ঘোষণা, DCSA বাউবি পাঠ্যবই সংক্রান্ত নীতি ও শিক্ষার্থী নির্দেশিকা।",
    kicker: "শিক্ষার্থী নির্দেশিকা ও নিয়মাবলী",
    heading: "ব্যবহারের শর্তাবলী (Terms & Conditions)",
    intro: "BOU Acadex ব্যবহার করার পূর্বে অনুগ্রহ করে আমাদের নীতিমালা ও আইনি শর্তসমূহ মনোযোগ দিয়ে পড়ুন।",
    current: "terms",
    content: `
      <div class="doc-alert-box">
        <div class="doc-alert-header"><span class="doc-alert-icon">📜</span><span class="doc-alert-title">মৌলিক শর্তাবলী: অনানুষ্ঠানিক চরিত্র ও বইয়ের মালিকানা</span></div>
        <div class="doc-alert-body">
          <p><strong>১. অনানুষ্ঠানিক স্টুডেন্ট পোর্টাল:</strong> এই সাইটটি ব্রাউজ বা ব্যবহার করার মাধ্যমে আপনি স্বীকার করছেন যে, BOU Acadex বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (BOU) কোনো অফিসিয়াল ওয়েবসাইট নয়। এটি শিক্ষার্থীদের দ্বারা পরিচালিত একটি স্বতন্ত্র শিক্ষা সহায়িকা প্ল্যাটফর্ম।</p>
          <p style="margin-top:10px"><strong>২. পাঠ্যপুস্তক বাউবি ও DCSA-এর সম্পদ:</strong> এই সাইটের মাধ্যমে পঠিতব্য সকল বই, সিলেবাস ও স্টাডি মেটেরিয়াল <strong>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU)</strong> এবং <strong>DCSA / Open School</strong>-এর স্বত্বাধিকারী সম্পত্তি। এই বইগুলো আমাদের নিজেদের নয়। এগুলো উন্মুক্ত শিক্ষামূলক দূরশিক্ষণ সহায়তায় প্রদর্শিত।</p>
        </div>
      </div>

      <article class="doc-card">
        <h2>১. শর্তাবলীর গ্রহণযোগ্যতা (Acceptance of Terms)</h2>
        <p>BOU Acadex ওয়েবসাইট, এর যেকোনো পেজ, ই-বুক রিডার, বিগত প্রশ্নের আর্কাইভ অথবা MCQ টেস্ট সিস্টেম ব্যবহার করার মাধ্যমে আপনি এই ব্যবহারের শর্তাবলী এবং আমাদের গোপনীয়তা নীতি মেনে চলতে সম্মতি প্রদান করছেন। আপনি যদি এই শর্তাবলীর কোনো অংশের সাথে একমত না হন, তবে সাইটটি ব্যবহার থেকে বিরত থাকার অনুরোধ করা যাচ্ছে।</p>
      </article>

      <article class="doc-card">
        <h2>২. শিক্ষামূলক ফেয়ার ইউজ ও কনটেন্ট ব্যবহার (Content & Fair Use)</h2>
        <ul>
          <li><strong>ব্যক্তিগত ও অবাণিজ্যিক ব্যবহার:</strong> শিক্ষার্থীরা শুধুমাত্র নিজস্ব পড়াশোনা ও পরীক্ষার প্রস্তুতির উদ্দেশ্যে এই প্ল্যাটফর্ম ব্যবহার করতে পারবেন।</li>
          <li><strong>বই বিক্রয় বা বাণিজ্যিকীকরণ নিষিদ্ধ:</strong> কোনো ব্যক্তি বা প্রতিষ্ঠান এই সাইটের কোনো বই, মডিউল বা প্রশ্নব্যাংক ডাউনলোড করে বাণিজ্যিকভাবে বিক্রি করতে পারবেন না। এটি আইনত দণ্ডনীয়।</li>
          <li><strong>অফিসিয়াল কপিরাইটের সম্মান:</strong> সকল পাঠ্যবইয়ের কপিরাইট বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় এবং সংশ্লিষ্ট অনুষদের শিক্ষকদের নিজস্ব বুদ্ধিবৃত্তিক সম্পদ।</li>
        </ul>
      </article>

      <article class="doc-card">
        <h2>৩. অনলাইন MCQ টেস্ট ও সেলফ-অ্যাসেসমেন্ট নীতি</h2>
        <p>আমাদের অনলাইন MCQ টেস্ট মডিউলটি শিক্ষার্থীদের নিজস্ব প্রস্তুতি যাচাইয়ের জন্য তৈরি।</p>
        <ul>
          <li>MCQ পরীক্ষার ফলাফল শুধুমাত্র আত্মমূল্যায়নের জন্য এবং এটি বাউবির কোনো প্রাতিষ্ঠানিক সনদ বা অফিসিয়াল গ্রেড নয়।</li>
          <li>প্রশ্ন ও উত্তরের সঠিকতা বজায় রাখতে সর্বোচ্চ সতর্কতা অবলম্বন করা হয়েছে। তবে কোনো অসঙ্গতি চোখে পড়লে অনুগ্রহ করে আমাদের অবহিত করুন।</li>
        </ul>
      </article>

      <article class="doc-card">
        <h2>৪. অফিসিয়াল কার্যক্রমের জন্য বাউবি সার্ভার ব্যবহার</h2>
        <p>শিক্ষার্থীদের অবশ্যই মনে রাখতে হবে যে:</p>
        <div class="doc-highlight-card"><p>⚠️ <strong>প্রশাসনিক কার্যাবলী:</strong> ভর্তি আবেদন (OSAPS), সেমিস্টার ফি জমা, পরীক্ষা রেজিস্ট্রেশন, প্রবেশপত্র সংগ্রহ ও মূল ফলাফল প্রকাশের জন্য শুধুমাত্র বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের অফিসিয়াল ওয়েবসাইট (<code>bou.ac.bd</code> ও <code>osapsnew.bou.ac.bd</code>) ব্যবহার করতে হবে। BOU Acadex কোনো প্রকার প্রাতিষ্ঠানিক ফি বা আবেদন গ্রহণ করে না।</p></div>
      </article>

      <article class="doc-card">
        <h2>৫. শর্তাবলী পরিবর্তন ও পরিমার্জন</h2>
        <p>BOU Acadex কর্তৃপক্ষ যেকোনো সময় এই শর্তাবলী পরিমার্জন বা হালনাগাদ করার অধিকার রাখে। নিয়মিত এই পেজটি পর্যালোচনা করার মাধ্যমে ব্যবহারকারীগণ সর্বশেষ নীতিমালা সম্পর্কে অবগত থাকতে পারবেন।</p>
        <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
          <a href="/disclaimer/" class="btn btn-outline" style="font-size:0.875rem">আইনি অস্বীকৃতি পড়ুন →</a>
          <a href="/privacy/" class="btn btn-outline" style="font-size:0.875rem">গোপনীয়তা নীতি দেখুন →</a>
        </div>
      </article>`,
  });
}

export function privacyPage() {
  return docPage({
    title: "গোপনীয়তা নীতি | Privacy Policy — BOU Acadex",
    description:
      "BOU Acadex-এর ডেটা সুরক্ষা ও গোপনীয়তা নীতি: শিক্ষার্থী তথ্য নিরাপত্তা, লোকাল স্টোরেজ ব্যবহার এবং অনানুষ্ঠানিক প্ল্যাটফর্ম ডেটা পলিসি।",
    kicker: "ডেটা সুরক্ষা ও বিশ্বাস",
    heading: "গোপনীয়তা নীতি (Privacy Policy)",
    intro: "শিক্ষার্থীদের তথ্যের নিরাপত্তা এবং গোপনীয়তা রক্ষায় BOU Acadex-এর অঙ্গীকার ও কর্মপদ্ধতি।",
    current: "privacy",
    content: `
      <div class="doc-alert-box">
        <div class="doc-alert-header"><span class="doc-alert-icon">🔒</span><span class="doc-alert-title">অনানুষ্ঠানিক প্ল্যাটফর্ম ও ডেটা নিরাপত্তা সংক্রান্ত স্পষ্ট বার্তা</span></div>
        <div class="doc-alert-body">
          <p><strong>১. অনানুষ্ঠানিক অবাণিজ্যিক স্টুডেন্ট হাব:</strong> BOU Acadex বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের কোনো প্রাতিষ্ঠানিক মাধ্যম নয়। আমরা শিক্ষার্থীদের কোনো আর্থিক তথ্য, বাউবি অফিসিয়াল পাসওয়ার্ড বা ব্যক্তিগত সংবেদনশীল ডেটা সংগ্রহ বা সংরক্ষণ করি না।</p>
          <p style="margin-top:10px"><strong>২. বহিঃস্থ বাউবি সার্ভার লিংক:</strong> যখন আপনি কোনো বই ডাউনলোড বা পড়ার জন্য ক্লিক করেন, তখন সরাসরি বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের সরকারি উন্মুক্ত আর্কাইভ (<code>ebookbou.edu.bd</code> / <code>bou.ac.bd</code>)-এর সাথে সংযোগ স্থাপিত হয়, যা সংশ্লিষ্ট কর্তৃপক্ষের নিজস্ব নীতিমালার অধীন।</p>
        </div>
      </div>

      <article class="doc-card">
        <h2>১. আমরা কী তথ্য সংগ্রহ করি? (Data Minimization)</h2>
        <p>আমরা ডেটা মিনিমাইজেশন নীতিতে বিশ্বাস করি। সাইট ব্যবহারের জন্য কোনো বাধ্যতামূলক রেজিস্ট্রেশন, অ্যাকাউন্ট তৈরি বা ফোন নম্বর দেওয়ার প্রয়োজন নেই।</p>
        <ul>
          <li><strong>কোনো ব্যক্তিগত তথ্য বিক্রয় নয়:</strong> আমরা শিক্ষার্থীদের নাম, ইমেইল বা পরিচয় কখনোই কোনো তৃতীয় পক্ষের কাছে বিপণন বা বিক্রয় করি না।</li>
          <li><strong>নো পেমেন্ট ডেটা:</strong> যেহেতু আমাদের পুরো সেবা সম্পূর্ণ ফ্রি, তাই এখানে কোনো ক্রেডিট কার্ড, বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টের তথ্য চাওয়ার সুযোগ নেই।</li>
        </ul>
      </article>

      <article class="doc-card">
        <h2>২. ব্রাউজারের লোকাল স্টোরেজ (Local Storage Usage)</h2>
        <p>ব্যবহারকারীর অভিজ্ঞতা উন্নত ও গতিশীল করার জন্য আমরা শুধুমাত্র আপনার ব্রাউজারের স্থানীয় মেমোরি (<code>localStorage</code>) ব্যবহার করি:</p>
        <div class="doc-info-grid">
          <div class="doc-info-item"><h4>🎨 থিম পছন্দ</h4><p>আপনার নির্বাচিত ডার্ক মোড (Dark Mode) বা লাইট মোড পছন্দ যাতে পরবর্তী ভিজিটেও বজায় থাকে।</p></div>
          <div class="doc-info-item"><h4>📝 MCQ পরীক্ষার অগ্রগতি</h4><p>মক টেস্ট চলাকালীন আপনার উত্তরসমূহ সাময়িকভাবে ক্লায়েন্ট-সাইডে সংরক্ষণ করা, যা পেজ রিলোড হলেও হারিয়ে যায় না।</p></div>
        </div>
        <p style="font-size:0.875rem;color:var(--text-muted);margin-top:12px">* এই তথ্যগুলো পুরোপুরি আপনার ডিভাইসেই সংরক্ষিত থাকে, আমাদের কোনো সার্ভারে প্রেরিত হয় না।</p>
      </article>

      <article class="doc-card">
        <h2>৩. বহিঃস্থ বাউবি লিঙ্ক ও গ্রন্থস্বত্ব (BOU & DCSA Links)</h2>
        <p>আমাদের সাইটের ই-বুক লিংকগুলো বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU) এবং DCSA-এর অফিসিয়াল উন্মুক্ত ডিজিটাল আর্কাইভ থেকে সংগৃহীত। আপনি যখন সেই লিংকগুলোতে যান, তখন বাউবি কর্তৃপক্ষের নিজস্ব প্রাইভেসি ও সার্ভার নীতিমালা প্রযোজ্য হবে।</p>
        <div class="doc-highlight-card"><p>💡 <strong>নিরাপত্তা টিপস:</strong> আপনার বাউবি স্টুডেন্ট আইডি পাসওয়ার্ড, OSAPS লগইন ক্রেডেনশিয়াল কখনোই কোনো অনানুষ্ঠানিক সাইটে প্রবেশ করাবেন না। শুধুমাত্র অফিসিয়াল ডোমেইন <code>*.bou.ac.bd</code>-তেই লগইন করুন।</p></div>
      </article>

      <article class="doc-card">
        <h2>৪. যোগাযোগ ও জিজ্ঞাসা</h2>
        <p>গোপনীয়তা নীতি সংক্রান্ত যেকোনো প্রশ্ন বা মতামত জানাতে আমাদের সাথে নির্দ্বিধায় যোগাযোগ করতে পারেন:</p>
        <p>ইমেইল: <a href="mailto:privacy@bouacadex.org" style="color:var(--tms-green);font-weight:700">privacy@bouacadex.org</a></p>
        <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
          <a href="/about/" class="btn btn-outline" style="font-size:0.875rem">আমাদের সম্পর্কে জানুন →</a>
          <a href="/disclaimer/" class="btn btn-outline" style="font-size:0.875rem">আইনি অস্বীকৃতি পড়ুন →</a>
        </div>
      </article>`,
  });
}

export function disclaimerPage() {
  return docPage({
    title: "আইনি অস্বীকৃতি ও গ্রন্থস্বত্ব | Disclaimer — BOU Acadex",
    description:
      "BOU Acadex-এর অনানুষ্ঠানিক অবস্থান, বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU) ও DCSA-এর বইয়ের কপিরাইট এবং আইনি অস্বীকৃতি সম্পর্কিত তথ্যাবলী।",
    kicker: "আইনি বিবৃতি ও স্বত্বাধিকার",
    heading: "আইনি অস্বীকৃতি ও গ্রন্থস্বত্ব",
    intro:
      "অনানুষ্ঠানিক স্টুডেন্ট প্ল্যাটফর্মের রূপরেখা, বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU) এবং DCSA-এর পাঠ্যবই সংক্রান্ত কপিরাইট নীতি।",
    current: "disclaimer",
    content: `
      <div class="doc-alert-box">
        <div class="doc-alert-header"><span class="doc-alert-icon">⚖️</span><span class="doc-alert-title">অনানুষ্ঠানিক অবস্থান ও মেধা স্বত্ব সম্পর্কিত স্পষ্টীকরণ</span></div>
        <div class="doc-alert-body">
          <p><strong>১. আমরা অনানুষ্ঠানিক (Unofficial Entity):</strong> BOU Acadex বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (Bangladesh Open University - BOU) কোনো অফিসিয়াল বা প্রাতিষ্ঠানিক ওয়েবসাইট নয়। এটি সম্পূর্ণ স্বাধীনভাবে শিক্ষার্থীদের যৌথ উদ্যোগে তৈরি একটি অবাণিজ্যিক ডিজিটাল শিক্ষা সহায়ক হাব।</p>
          <p style="margin-top:12px"><strong>২. বইগুলো আমাদের নিজস্ব নয় (Books are from DCSA/BOU, NOT Ours):</strong> এই সাইটে প্রদর্শিত, পড়ার সুবিধা দেওয়া বা লিংক করা সকল ই-বুক, টেক্সটবুক এবং কোর্স মডিউল <strong>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU)</strong> এবং সংশ্লিষ্ট অনুষদ ও বিভাগ (যেমন: ডিপার্টমেন্ট অব কম্পিউটার সায়েন্স অ্যান্ড অ্যাপ্লিকেশন - DCSA, ওপেন স্কুল, ব্যবসায় শিক্ষা স্কুল)-এর নিজস্ব সম্পদ। আমরা কোনো বইয়ের রচয়িতা বা স্বত্বাধিকারী নই।</p>
        </div>
      </div>

      <article class="doc-card">
        <h2>📖 বই ও স্টাডি মডিউল সংগ্রহ নীতি (DCSA & BOU Sourcing)</h2>
        <p>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় দূরশিক্ষণের শিক্ষার্থীদের জন্য তাদের আনুষ্ঠানিক ই-বুক পোর্টাল (<code>ebookbou.edu.bd</code>) এবং মূল ওয়েব সার্ভারে বিনামূল্যে পড়ার উপযোগী ডিজিটাল পিডিএফ সংস্করণ উন্মুক্ত করে রেখেছে।</p>
        <p>BOU Acadex শিক্ষার্থীদের সুবিধার্থে সেই উন্মুক্ত পাবলিক লিংক ও আর্কাইভসমূহ এক ছাদের নিচে গোছানো ক্যাটালগ আকারে উপস্থাপন করে। যাতে শিক্ষার্থীরা ধীরগতির ইন্টারনেট বা জটিল নেভিগেশন ছাড়াই সহজে তাদের প্রয়োজনীয় বিষয়ের বই পড়তে পারেন।</p>
        <div class="doc-highlight-card"><p>📌 <strong>ফেয়ার ইউজ (Fair Use Policy):</strong> সকল বই ও প্রশ্নপত্র শুধুমাত্র শিক্ষার্থীদের অবাণিজ্যিক শিক্ষা ও ব্যক্তিগত অধ্যয়নের জন্য প্রদর্শিত হচ্ছে। কোনো বই বা মেটেরিয়াল বিক্রয়, বাণিজ্যিক পুনরুৎপাদন বা আর্থিক লেনদেনের কাজে ব্যবহার করা কঠোরভাবে নিষিদ্ধ।</p></div>
      </article>

      <article class="doc-card">
        <h2>🛡️ মেধা স্বত্ব, ট্রেডমার্ক ও লোগো সম্পর্কিত</h2>
        <ul>
          <li><strong>বাউবি লোগো ও নাম:</strong> &quot;বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়&quot;, &quot;Bangladesh Open University&quot;, &quot;BOU&quot; এবং সংশ্লিষ্ট স্কুলের নাম ও মনোগ্রাম বিশ্ববিদ্যালয় কর্তৃপক্ষের আইনগত সম্পত্তি। এই নামসমূহ শুধুমাত্র শনাক্তকরণ ও প্রাসঙ্গিক শিক্ষামূলক রেফারেন্স হিসেবে ব্যবহার করা হয়েছে।</li>
          <li><strong>লেখক ও প্যানেল স্বত্ব:</strong> প্রতিটি বইয়ের প্রণেতা, সম্পাদক, পরিমার্জক এবং কোর্স কো-অর্ডিনেটরগণের মেধা স্বত্ব সম্পূর্ণ সংরক্ষিত।</li>
          <li><strong>BOU Acadex কোডবেস:</strong> সাইটের ইউজার ইন্টারফেস (UI), রেসপনসিভ ওয়েব ডিজাইন এবং কোড কাঠামো আমাদের ওপেন সোর্স কন্ট্রিবিউটরদের কাজ, যা উন্মুক্তভাবে শিক্ষার্থীদের সেবায় নিয়োজিত।</li>
        </ul>
      </article>

      <article class="doc-card">
        <h2>🚫 প্রাতিষ্ঠানিক দায়মুক্তি (Limitation of Liability)</h2>
        <p>যেহেতু BOU Acadex কোনো অফিসিয়াল মাধ্যম নয়:</p>
        <ol>
          <li>এখানে প্রদর্শিত কোনো নোটিশ, পরীক্ষার সম্ভাব্য তারিখ বা সিলেবাস পরিবর্তন সংক্রান্ত তথ্যের চূড়ান্ত বৈধতার জন্য শিক্ষার্থীকে অবশ্যই বিশ্ববিদ্যালয়ের অফিসিয়াল পোর্টাল (<code>bou.ac.bd</code>) অথবা নিজ নিজ আঞ্চলিক বা উপ-আঞ্চলিক কেন্দ্রে যোগাযোগ করতে হবে।</li>
          <li>অনানুষ্ঠানিক তথ্যের ওপর ভিত্তি করে কোনো শিক্ষার্থীর একাডেমিক বা ব্যক্তিগত ক্ষতির জন্য BOU Acadex টিম দায়বদ্ধ থাকবে না।</li>
          <li>ভর্তি, রেজিস্ট্রেশন, ফি প্রদান, টিউটোরিয়াল অ্যাসাইনমেন্ট জমা ও মূল সনদ সংক্রান্ত যেকোনো বিষয়ের জন্য বাউবির অফিসিয়াল OSAPS ও পরীক্ষা সেবাই একমাত্র প্রামাণ্য মাধ্যম।</li>
        </ol>
      </article>

      <article class="doc-card">
        <h2>📬 টেকডাউন অনুরোধ ও কপিরাইট যোগাযোগ (Notice & Takedown)</h2>
        <p>আমরা বুদ্ধিবৃত্তিক সম্পদ ও কপিরাইটের প্রতি সর্বোচ্চ শ্রদ্ধাশীল। বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় কর্তৃপক্ষ, DCSA বিভাগ, কোনো লেখক বা স্বত্বাধিকারী যদি এই সাইটে লিংক করা কোনো কনটেন্ট অপসারণ বা সংশোধন করতে চান, তবে আমরা তাত্ক্ষণিকভাবে তা কার্যকর করতে অঙ্গীকারবদ্ধ।</p>
        <p>যেকোনো প্রয়োজনে সরাসরি আমাদের সাথে যোগাযোগ করার জন্য অনুরোধ করা যাচ্ছে:</p>
        <div class="doc-info-grid">
          <div class="doc-info-item"><h4>📧 ইমেইল যোগাযোগ</h4><p><a href="mailto:contact@bouacadex.org" style="color:var(--tms-green);font-weight:700">contact@bouacadex.org</a></p></div>
          <div class="doc-info-item"><h4>🏛️ অফিসিয়াল বাউবি ওয়েবসাইট</h4><p><a href="https://bou.ac.bd" target="_blank" rel="noopener" style="color:var(--tms-green);font-weight:700">www.bou.ac.bd ↗</a></p></div>
        </div>
      </article>

      <div style="text-align:center;margin-top:32px">
        <a href="/terms/" class="btn btn-outline" style="margin-right:12px">ব্যবহারের শর্তাবলী দেখুন →</a>
        <a href="/about/" class="btn btn-primary">আমাদের সম্পর্কে আরও জানুন →</a>
      </div>`,
  });
}

export function apiDocsPage() {
  const endpoints = [
    { method: "GET", endpoint: "/beta/api/books", description: "ই-বুক তালিকা ফিল্টার: <code>school</code>, <code>program</code>, <code>level</code>, <code>q</code>" },
    { method: "GET", endpoint: "/beta/api/questions", description: "বিগত প্রশ্ন ও মডেল সমাধান: <code>year</code>, <code>program</code>, <code>school</code>, <code>semester</code>, <code>q</code>" },
    { method: "GET", endpoint: "/beta/api/notices", description: "পরীক্ষার নোটিশ ও রুটিন আপডেট" },
    { method: "GET", endpoint: "/beta/api/mcq", description: "উপলব্ধ MCQ বিষয়ের তালিকা" },
    { method: "GET", endpoint: "/beta/api/mcq?subject=ict", description: "নির্দিষ্ট বিষয়ের পূর্ণাঙ্গ প্রশ্নব্যাংক" },
    { method: "POST", endpoint: "/beta/api/mcq", description: "MCQ পরীক্ষার স্বয়ংক্রিয় মূল্যায়ন: <code>{ subject, answers }</code>" },
  ];

  const content = `<header class="section-header">
    <span class="section-kicker">ডেভেলপার রিসোর্স</span>
    <h1 class="section-title">BOU Acadex HTTP API</h1>
    <p class="section-desc">বাউবি স্টুডেন্ট হাবের পাবলিক JSON এন্ডপয়েন্টসমূহ। সকল রেসপন্স <code>{ success, data }</code> ফরম্যাটে প্রদান করা হয় এবং এক্সটার্নাল ক্লায়েন্টের জন্য CORS সক্রিয় রয়েছে।</p>
    <div style="margin-top:20px">${legalTabs("api")}</div>
  </header>
  <div style="overflow-x:auto;background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:0 4px 16px rgba(0,0,0,0.03)">
    <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
      <thead><tr style="background:var(--bg-surface-muted);text-align:left;border-bottom:1px solid var(--border-subtle)">
        <th style="padding:14px 18px;font-weight:800">Method</th><th style="padding:14px 18px;font-weight:800">Endpoint</th><th style="padding:14px 18px;font-weight:800">Description</th>
      </tr></thead>
      <tbody>
        ${endpoints
          .map(
            (entry, index) => `<tr${index < endpoints.length - 1 ? ' style="border-bottom:1px solid var(--border-subtle)"' : ""}>
          <td style="padding:14px 18px;font-weight:800;color:${entry.method === "GET" ? "var(--tms-green)" : "var(--tms-red)"}">${entry.method}</td>
          <td style="padding:14px 18px"><code>${entry.endpoint}</code></td>
          <td style="padding:14px 18px;color:var(--text-secondary)">${entry.description}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>
  <p class="section-desc" style="margin-top:18px">API সার্ভারটি <a href="/beta/" style="color:var(--tms-green)">/beta</a> অ্যাপের অধীনে চলে।</p>`;

  const body = `<main class="section"><div class="container">${content}</div></main>`;
  return layout({
    title: "API Reference & Developers | BOU Acadex",
    description:
      "HTTP API reference for the BOU Acadex academic hub: e-books, past questions, notices and MCQ banks.",
    body,
  });
}
