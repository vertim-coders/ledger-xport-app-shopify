/*
  Warnings:

  - You are about to drop the column `userId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_userId_fkey";

-- DropIndex
DROP INDEX "Shop_userId_idx";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "userId";

-- DropTable
DROP TABLE "User";
