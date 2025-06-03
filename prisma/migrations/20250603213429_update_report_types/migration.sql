/*
  Warnings:

  - The `format` column on the `Report` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Report` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "format",
ADD COLUMN     "format" "ExportFormat" NOT NULL DEFAULT 'CSV',
DROP COLUMN "status",
ADD COLUMN     "status" "ReportStatus" NOT NULL DEFAULT 'PENDING';
