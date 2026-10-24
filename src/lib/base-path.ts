// The app is served from the domain root (no base path).
export const BASE_PATH = "/";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return path;
}
