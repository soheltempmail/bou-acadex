import type { Book, McqBankSummary, McqQuestion, Notice, QuestionPaper } from "@/types";
import { withBasePath } from "@/lib/base-path";

export const API_BASE = withBasePath("/api");

export interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

export interface McqBankResponse {
  success: boolean;
  subject: string;
  title: string;
  code: string;
  school: string;
  duration: number;
  totalQuestions: number;
  questions: McqQuestion[];
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(API_BASE + path, options);
  } catch {
    throw new Error(
      "Cannot reach the API at " + API_BASE + ". Start the server with `npm run dev`."
    );
  }

  const payload = (await response.json().catch(() => null)) as
    | (ApiEnvelope<unknown> & Record<string, unknown>)
    | null;

  if (!response.ok || !payload || payload.success === false) {
    const message = (payload && typeof payload.error === "string" && payload.error) ||
      "Request failed (" + response.status + ")";
    throw new Error(message);
  }

  return payload as T;
}

export const api = {
  get<T>(path: string): Promise<T> {
    return request<T>(path);
  },
  post<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
    });
  },
};

export function getBooks(): Promise<ApiEnvelope<Book[]>> {
  return api.get<ApiEnvelope<Book[]>>("/books");
}

export function getQuestions(): Promise<ApiEnvelope<QuestionPaper[]>> {
  return api.get<ApiEnvelope<QuestionPaper[]>>("/questions");
}

export function getNotices(): Promise<ApiEnvelope<Notice[]>> {
  return api.get<ApiEnvelope<Notice[]>>("/notices");
}

export function getMcqSubjects(): Promise<ApiEnvelope<McqBankSummary[]>> {
  return api.get<ApiEnvelope<McqBankSummary[]>>("/mcq");
}

export function getMcqBank(subject: string): Promise<McqBankResponse> {
  return api.get<McqBankResponse>("/mcq?subject=" + encodeURIComponent(subject));
}
