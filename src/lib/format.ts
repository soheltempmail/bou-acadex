const SEMESTER_LABELS: Record<string, string> = {
  "1": "1st",
  "2": "2nd",
  "3": "3rd",
  "4": "4th",
  "5": "5th",
  "6": "6th",
};

export function semesterLabel(value: string | number): string {
  return SEMESTER_LABELS[String(value)] || String(value) + "th";
}

export function isExternalLink(link: string): boolean {
  return /^https?:\/\//i.test(link);
}
