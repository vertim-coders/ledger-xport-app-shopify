import { LoaderFunctionArgs } from "@remix-run/node";
import { promises as fs } from "fs";
import { join } from "path";
import { prisma } from "../db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { fileName } = params;
  if (!fileName) {
    throw new Response("File name required", { status: 400 });
  }

  // Try reports/ first
  let filePath = join(process.cwd(), "reports", fileName);
  let file;
  try {
    file = await fs.readFile(filePath);
  } catch (e) {
    // If not found, try exports/*/fileName
    const exportsDir = join(process.cwd(), "exports");
    const shopDirs = await fs.readdir(exportsDir).catch(() => []);
    let found = false;
    for (const shopId of shopDirs) {
      const tryPath = join(exportsDir, shopId, fileName);
      try {
        file = await fs.readFile(tryPath);
        found = true;
        break;
      } catch {}
    }
    if (!found) {
      return new Response("File not found", { status: 404 });
    }
  }

  // Guess content type
  let contentType = "application/octet-stream";
  if (fileName.endsWith(".csv")) contentType = "text/csv";
  else if (fileName.endsWith(".xlsx")) contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  else if (fileName.endsWith(".json")) contentType = "application/json";
  else if (fileName.endsWith(".txt")) contentType = "text/plain";

  return new Response(file, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename=\"${fileName}\"`,
    },
  });
}; 