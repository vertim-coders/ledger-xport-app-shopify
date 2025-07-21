/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStatus` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `trialEndDate` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `trialStartDate` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "subscriptionId",
DROP COLUMN "subscriptionStatus",
DROP COLUMN "trialEndDate",
DROP COLUMN "trialStartDate",
ADD COLUMN     "subscription_status" "SubscriptionStatus" NOT NULL DEFAULT 'TRIAL',
ADD COLUMN     "trial_end_date" TIMESTAMP(3),
ADD COLUMN     "trial_start_date" TIMESTAMP(3);
