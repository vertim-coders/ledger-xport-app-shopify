/*
  Warnings:

  - You are about to drop the column `fiscalRegimeId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the `CompanyParams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompanyParams" DROP CONSTRAINT "CompanyParams_shopId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyParams" DROP CONSTRAINT "CompanyParams_userId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_fiscalRegimeId_fkey";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "fiscalRegimeId";

-- DropTable
DROP TABLE "CompanyParams";

-- CreateTable
CREATE TABLE "FiscalConfiguration" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "vatRate" DOUBLE PRECISION,
    "defaultFormat" "ExportFormat",
    "fiscalRegimeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FiscalConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FiscalConfiguration_shopId_key" ON "FiscalConfiguration"("shopId");

-- CreateIndex
CREATE INDEX "FiscalConfiguration_fiscalRegimeId_idx" ON "FiscalConfiguration"("fiscalRegimeId");

-- AddForeignKey
ALTER TABLE "FiscalConfiguration" ADD CONSTRAINT "FiscalConfiguration_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiscalConfiguration" ADD CONSTRAINT "FiscalConfiguration_fiscalRegimeId_fkey" FOREIGN KEY ("fiscalRegimeId") REFERENCES "FiscalRegime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
