/*
  Warnings:

  - The `exportFormats` column on the `FiscalConfiguration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `requiredColumns` column on the `FiscalConfiguration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `taxRates` on the `FiscalConfiguration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Create temporary columns
ALTER TABLE "FiscalConfiguration" 
ADD COLUMN "exportFormats_new" TEXT[],
ADD COLUMN "requiredColumns_new" TEXT[],
ADD COLUMN "taxRates_new" JSONB;

-- Convert data
UPDATE "FiscalConfiguration"
SET 
  "exportFormats_new" = ARRAY(SELECT jsonb_array_elements_text(to_jsonb("exportFormats"::json))),
  "requiredColumns_new" = ARRAY(SELECT jsonb_array_elements_text(to_jsonb("requiredColumns"::json))),
  "taxRates_new" = "taxRates"::jsonb;

-- Drop old columns
ALTER TABLE "FiscalConfiguration"
DROP COLUMN "exportFormats",
DROP COLUMN "requiredColumns",
DROP COLUMN "taxRates";

-- Rename new columns
ALTER TABLE "FiscalConfiguration" 
RENAME COLUMN "exportFormats_new" TO "exportFormats";
ALTER TABLE "FiscalConfiguration" 
RENAME COLUMN "requiredColumns_new" TO "requiredColumns";
ALTER TABLE "FiscalConfiguration" 
RENAME COLUMN "taxRates_new" TO "taxRates";

-- Make taxRates NOT NULL after data is converted
ALTER TABLE "FiscalConfiguration" ALTER COLUMN "taxRates" SET NOT NULL;
