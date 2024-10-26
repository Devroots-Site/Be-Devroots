-- AlterTable
ALTER TABLE "language" ADD COLUMN     "picturepath" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "version" DROP NOT NULL,
ALTER COLUMN "creator" DROP NOT NULL;
