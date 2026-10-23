import { serveStaticFile } from "@/lib/static-handler";

export const dynamic = "force-dynamic";

export async function GET() {
  return serveStaticFile("");
}
