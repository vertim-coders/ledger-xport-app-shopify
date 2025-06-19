import { LoaderFunctionArgs } from "@remix-run/node";
import { promises as fs } from "fs";
import { join } from "path";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { fileName } = params;
  if (!fileName) {
    throw new Response("File name required", { status: 400 });
  }
  const filePath = join(process.cwd(), "reports", fileName);

  try {
    const file = await fs.readFile(filePath);
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
  } catch (e) {
    return new Response("File not found", { status: 404 });
  }
}; 