/*
  Warnings:

  - Added the required column `dataType` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN "dataType" TEXT NOT NULL DEFAULT 'orders';

-- Remove the default after adding the column
ALTER TABLE "Report" ALTER COLUMN "dataType" DROP DEFAULT;
