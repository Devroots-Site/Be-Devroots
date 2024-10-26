/*
  Warnings:

  - You are about to drop the `language` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "language";

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "keywords" TEXT[],
    "version" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "creator" TEXT,
    "filepath" TEXT NOT NULL,
    "picturepath" TEXT,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_filepath_key" ON "Language"("filepath");
