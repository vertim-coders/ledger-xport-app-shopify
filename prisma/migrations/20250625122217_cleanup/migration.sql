/*
  Warnings:

  - You are about to drop the column `domain` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "domain",
DROP COLUMN "name";
