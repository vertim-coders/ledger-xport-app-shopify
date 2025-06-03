/*
  Warnings:

  - You are about to drop the column `dataTypes` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `fiscalRegimeId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `software` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Report` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'ERROR');

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_fiscalRegimeId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "dataTypes",
DROP COLUMN "filename",
DROP COLUMN "fiscalRegimeId",
DROP COLUMN "software",
DROP COLUMN "userId",
ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "fileSize" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'sales',
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "endDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "format" SET DEFAULT 'CSV',
ALTER COLUMN "status" SET DEFAULT 'PENDING';
