/*
  Warnings:

  - Added the required column `compatibleSoftware` to the `FiscalRegime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exportFormats` to the `FiscalRegime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FiscalRegime" ADD COLUMN     "compatibleSoftware" JSONB NOT NULL,
ADD COLUMN     "exportFormats" JSONB NOT NULL,
ADD COLUMN     "notes" TEXT;
