import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { withBasePath } from "@/lib/base-path";
import "../styles/style.css";

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var key = 'bou_acadex_theme';
    var saved = localStorage.getItem(key);
    var prefersDark = !saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var active = saved === 'dark' || (!saved && prefersDark) ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', active);
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  title: "BOU Acadex - বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় স্টুডেন্ট একাডেমিক হাব",
  description:
    "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (BOU) শিক্ষার্থীদের জন্য সকল পাঠ্যবই (ই-বুক), বিগত বছরের প্রশ্ন ও মডেল সমাধান এবং লাইভ টাইমার সহ আনলিমিটেড MCQ টেস্ট।",
  icons: { icon: withBasePath("/assets/favicon.svg") },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
