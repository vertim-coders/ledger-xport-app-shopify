/*
  Warnings:

  - The values [CUSTOM] on the enum `FiscalRegime` will be removed. If these variants are still used in the database, this will fail.
  - The values [MANAGER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Export` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExportTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduledTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ShopToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `domain` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FiscalRegime_new" AS ENUM ('OHADA', 'FRANCE', 'CANADA');
ALTER TABLE "Shop" ALTER COLUMN "fiscalRegime" TYPE "FiscalRegime_new" USING ("fiscalRegime"::text::"FiscalRegime_new");
ALTER TYPE "FiscalRegime" RENAME TO "FiscalRegime_old";
ALTER TYPE "FiscalRegime_new" RENAME TO "FiscalRegime";
DROP TYPE "FiscalRegime_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'USER', 'ACCOUNTANT');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Export" DROP CONSTRAINT "Export_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Export" DROP CONSTRAINT "Export_templateId_fkey";

-- DropForeignKey
ALTER TABLE "ExportTemplate" DROP CONSTRAINT "ExportTemplate_shopId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledTask" DROP CONSTRAINT "ScheduledTask_shopId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledTask" DROP CONSTRAINT "ScheduledTask_templateId_fkey";

-- DropForeignKey
ALTER TABLE "ShopSettings" DROP CONSTRAINT "ShopSettings_shopId_fkey";

-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToUser" DROP CONSTRAINT "_ShopToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToUser" DROP CONSTRAINT "_ShopToUser_B_fkey";

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "fiscalRegime" SET DEFAULT 'OHADA';

-- DropTable
DROP TABLE "Export";

-- DropTable
DROP TABLE "ExportTemplate";

-- DropTable
DROP TABLE "ScheduledTask";

-- DropTable
DROP TABLE "ShopSettings";

-- DropTable
DROP TABLE "UserSettings";

-- DropTable
DROP TABLE "_ShopToUser";

-- DropEnum
DROP TYPE "ExportStatus";

-- DropEnum
DROP TYPE "TaskFrequency";

-- CreateTable
CREATE TABLE "CompanyParams" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "vatRate" DOUBLE PRECISION,
    "defaultFormat" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyParams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyParams_userId_key" ON "CompanyParams"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyParams_shopId_key" ON "CompanyParams"("shopId");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyParams" ADD CONSTRAINT "CompanyParams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyParams" ADD CONSTRAINT "CompanyParams_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
