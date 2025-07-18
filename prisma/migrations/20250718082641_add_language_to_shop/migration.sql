/*
  Warnings:

  - You are about to drop the column `taxSetupCompleted` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "taxSetupCompleted",
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'fr';
