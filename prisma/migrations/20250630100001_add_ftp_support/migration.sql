-- CreateEnum
CREATE TYPE "Protocol" AS ENUM ('FTP', 'SFTP');

-- CreateEnum
CREATE TYPE "FtpDeliveryStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "deliveryMethod" TEXT NOT NULL DEFAULT 'EMAIL',
ADD COLUMN     "ftpDeliveryStatus" "FtpDeliveryStatus";

-- CreateTable
CREATE TABLE "ftp_configs" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL DEFAULT 21,
    "protocol" "Protocol" NOT NULL DEFAULT 'SFTP',
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "directory" TEXT NOT NULL DEFAULT '/',
    "passiveMode" BOOLEAN NOT NULL DEFAULT false,
    "retryDelay" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ftp_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ftp_configs_shopId_key" ON "ftp_configs"("shopId");

-- CreateIndex
CREATE INDEX "ftp_configs_shopId_idx" ON "ftp_configs"("shopId");

-- AddForeignKey
ALTER TABLE "ftp_configs" ADD CONSTRAINT "ftp_configs_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
