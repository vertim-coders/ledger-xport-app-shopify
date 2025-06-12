/*
  Warnings:

  - You are about to drop the column `scope` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "scope";

-- CreateTable
CREATE TABLE "GeneralSettings" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "language" TEXT NOT NULL DEFAULT 'fr',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneralSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneralSettings_shopId_key" ON "GeneralSettings"("shopId");

-- CreateIndex
CREATE INDEX "GeneralSettings_shopId_idx" ON "GeneralSettings"("shopId");

-- CreateIndex
CREATE INDEX "Shop_userId_idx" ON "Shop"("userId");

-- AddForeignKey
ALTER TABLE "GeneralSettings" ADD CONSTRAINT "GeneralSettings_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
