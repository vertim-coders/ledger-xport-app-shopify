import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { createObjectCsvWriter } from "csv-writer";
import { XMLParser } from "fast-xml-parser";
import * as XLSX from "xlsx";
import fs from "fs/promises";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const reportId = params.id;

  if (!reportId) {
    throw new Response("Report ID is required", { status: 400 });
  }

  const report = await prisma.report.findUnique({
    where: { id: reportId },
  });

  if (!report || !report.filePath) {
    throw new Response("Report file not found", { status: 404 });
  }

  const reportData = JSON.parse(await fs.readFile(report.filePath, 'utf-8'));
  let fileContent: Buffer;
  let contentType: string;

  switch (report.format.toLowerCase()) {
    case "csv":
      const csvWriter = createObjectCsvWriter({
        path: "temp.csv",
        header: Object.keys(reportData[0]).map((key) => ({
          id: key,
          title: key,
        })),
      });

      await csvWriter.writeRecords(reportData);
      fileContent = Buffer.from(reportData);
      contentType = "text/csv";
      break;

    case "xml":
      const parser = new XMLParser();
      const xmlContent = parser.parse(reportData);
      fileContent = Buffer.from(xmlContent);
      contentType = "application/xml";
      break;

    case "xlsx":
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(reportData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
      fileContent = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
      contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      break;

    default:
      throw new Response("Unsupported format", { status: 400 });
  }

  return new Response(fileContent, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${report.fileName}.${report.format}"`,
    },
  });
}; 