-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIAL', 'ACTIVE', 'EXPIRED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'TRIAL',
ADD COLUMN     "trialEndDate" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '15 days',
ADD COLUMN     "trialStartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
