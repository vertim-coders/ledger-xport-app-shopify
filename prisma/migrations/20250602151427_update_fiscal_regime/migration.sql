/*
  Warnings:

  - You are about to drop the column `fiscalRegime` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "fiscalRegime",
ADD COLUMN     "fiscalRegimeId" TEXT;

-- DropEnum
DROP TYPE "FiscalRegime";

-- CreateTable
CREATE TABLE "FiscalRegime" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "countries" TEXT[],
    "currency" TEXT NOT NULL,
    "fileFormat" TEXT NOT NULL,
    "encoding" TEXT NOT NULL DEFAULT 'UTF-8',
    "separator" TEXT NOT NULL,
    "requiredColumns" JSONB NOT NULL,
    "taxRates" JSONB NOT NULL,
    "specificRules" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FiscalRegime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FiscalRegime_code_key" ON "FiscalRegime"("code");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_fiscalRegimeId_fkey" FOREIGN KEY ("fiscalRegimeId") REFERENCES "FiscalRegime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
