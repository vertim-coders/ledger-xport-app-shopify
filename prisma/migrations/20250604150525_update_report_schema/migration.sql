/*
  Warnings:

  - Added the required column `fileName` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "fileName" TEXT NOT NULL;
