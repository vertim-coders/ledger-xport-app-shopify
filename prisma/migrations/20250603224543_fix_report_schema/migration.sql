/*
  Warnings:

  - Added the required column `fiscalRegimeId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "fiscalRegimeId" TEXT NOT NULL,
ALTER COLUMN "startDate" DROP DEFAULT,
ALTER COLUMN "endDate" DROP DEFAULT,
ALTER COLUMN "fileSize" DROP DEFAULT,
ALTER COLUMN "type" DROP DEFAULT,
ALTER COLUMN "format" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Report_shopId_idx" ON "Report"("shopId");

-- CreateIndex
CREATE INDEX "Report_fiscalRegimeId_idx" ON "Report"("fiscalRegimeId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_fiscalRegimeId_fkey" FOREIGN KEY ("fiscalRegimeId") REFERENCES "FiscalRegime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
