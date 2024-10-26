/*
  Warnings:

  - A unique constraint covering the columns `[filepath]` on the table `language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filepath` to the `language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "language" ADD COLUMN     "filepath" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "language_filepath_key" ON "language"("filepath");
