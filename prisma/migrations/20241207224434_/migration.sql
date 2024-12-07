/*
  Warnings:

  - The `keywords` column on the `languages` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "languages" DROP COLUMN "keywords",
ADD COLUMN     "keywords" JSONB;
