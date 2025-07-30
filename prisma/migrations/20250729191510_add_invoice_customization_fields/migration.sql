-- AlterTable
ALTER TABLE "GeneralSettings" ADD COLUMN     "invoiceAddress" TEXT,
ADD COLUMN     "invoiceCompanyName" TEXT,
ADD COLUMN     "invoiceEmail" TEXT,
ADD COLUMN     "invoiceLogoHeight" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "invoiceLogoUrl" TEXT,
ADD COLUMN     "invoiceLogoWidth" INTEGER NOT NULL DEFAULT 150,
ADD COLUMN     "invoicePhone" TEXT;
