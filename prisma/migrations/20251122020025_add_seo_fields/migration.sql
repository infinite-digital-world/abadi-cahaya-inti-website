-- AlterTable
ALTER TABLE "Post" ADD COLUMN "ogImage" TEXT;
ALTER TABLE "Post" ADD COLUMN "seoDescription" TEXT;
ALTER TABLE "Post" ADD COLUMN "seoKeywords" TEXT;
ALTER TABLE "Post" ADD COLUMN "seoTitle" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "ogImage" TEXT;
ALTER TABLE "Product" ADD COLUMN "seoDescription" TEXT;
ALTER TABLE "Product" ADD COLUMN "seoKeywords" TEXT;
ALTER TABLE "Product" ADD COLUMN "seoTitle" TEXT;

-- CreateTable
CREATE TABLE "PageSEO" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "keywords" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "canonicalUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PageSEO_path_key" ON "PageSEO"("path");
