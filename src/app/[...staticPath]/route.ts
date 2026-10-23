import { serveStaticFile } from "@/lib/static-handler";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { staticPath?: string[] } }
) {
  const segments = params.staticPath || [];
  if (segments.length === 0 || segments[0] === "beta" || segments[0] === "api") {
    return new Response("Not Found", { status: 404 });
  }

  const relativePath = segments.join("/");
  return serveStaticFile(relativePath);
}
