export const BASE_PATH = "/beta";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  if (path === "/beta" || path.startsWith("/beta/")) return path;
  return `/beta${path === "/" ? "" : path}`;
}
