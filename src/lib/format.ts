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

const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBanglaDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (digit) => BANGLA_DIGITS[Number(digit)]);
}
