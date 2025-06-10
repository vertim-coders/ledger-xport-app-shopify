/*
  Warnings:

  - You are about to drop the column `fiscalRegimeId` on the `FiscalConfiguration` table. All the data in the column will be lost.
  - You are about to drop the column `fiscalRegimeId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the `FiscalRegime` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `FiscalConfiguration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `FiscalConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compatibleSoftware` to the `FiscalConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `FiscalConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exportFormats` to the `FiscalConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileFormat` to the `FiscalConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `FiscalConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiredColumns` to the `FiscalConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `separator` to the `FiscalConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxRates` to the `FiscalConfiguration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FiscalConfiguration" DROP CONSTRAINT "FiscalConfiguration_fiscalRegimeId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_fiscalRegimeId_fkey";

-- DropIndex
DROP INDEX "FiscalConfiguration_fiscalRegimeId_idx";

-- DropIndex
DROP INDEX "Report_fiscalRegimeId_idx";

-- AlterTable
ALTER TABLE "FiscalConfiguration" DROP COLUMN "fiscalRegimeId",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "compatibleSoftware" JSONB NOT NULL,
ADD COLUMN     "countries" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "encoding" TEXT NOT NULL DEFAULT 'UTF-8',
ADD COLUMN     "exportFormats" JSONB NOT NULL,
ADD COLUMN     "fileFormat" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "requiredColumns" JSONB NOT NULL,
ADD COLUMN     "separator" TEXT NOT NULL,
ADD COLUMN     "specificRules" JSONB,
ADD COLUMN     "taxRates" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "fiscalRegimeId";

-- DropTable
DROP TABLE "FiscalRegime";

-- CreateIndex
CREATE UNIQUE INDEX "FiscalConfiguration_code_key" ON "FiscalConfiguration"("code");
