/*
  Warnings:

  - You are about to drop the column `specificRules` on the `FiscalConfiguration` table. All the data in the column will be lost.
  - The `compatibleSoftware` column on the `FiscalConfiguration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `notes` on table `FiscalConfiguration` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FiscalConfiguration" DROP CONSTRAINT "FiscalConfiguration_shopId_fkey";

-- DropIndex
DROP INDEX "FiscalConfiguration_code_key";

-- AlterTable
ALTER TABLE "FiscalConfiguration" DROP COLUMN "specificRules",
ADD COLUMN     "salesAccount" TEXT NOT NULL DEFAULT '701',
ALTER COLUMN "companyName" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
DROP COLUMN "compatibleSoftware",
ADD COLUMN     "compatibleSoftware" TEXT[],
ALTER COLUMN "encoding" DROP DEFAULT,
ALTER COLUMN "exportFormats" SET DATA TYPE TEXT,
ALTER COLUMN "notes" SET NOT NULL,
ALTER COLUMN "requiredColumns" SET DATA TYPE TEXT,
ALTER COLUMN "taxRates" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "FiscalConfiguration_shopId_idx" ON "FiscalConfiguration"("shopId");

-- AddForeignKey
ALTER TABLE "FiscalConfiguration" ADD CONSTRAINT "FiscalConfiguration_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
