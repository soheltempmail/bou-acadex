import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

interface PageShellProps {
  showSchoolsLink?: boolean;
  footerVariant?: "default" | "compact";
  children: ReactNode;
}

export function PageShell({ showSchoolsLink = false, footerVariant = "compact", children }: PageShellProps) {
  return (
    <>
      <SiteHeader showSchoolsLink={showSchoolsLink} />
      {children}
      <SiteFooter variant={footerVariant} />
    </>
  );
}
