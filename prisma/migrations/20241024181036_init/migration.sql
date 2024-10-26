-- CreateTable
CREATE TABLE "language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT[],
    "version" TEXT NOT NULL,
    "createt_at" TIMESTAMP(3) NOT NULL,
    "updatet_at" TIMESTAMP(3) NOT NULL,
    "creator" TEXT NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "language_name_key" ON "language"("name");
