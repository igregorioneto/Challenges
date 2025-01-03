-- CreateTable
CREATE TABLE "article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "date" DATETIME NOT NULL
);
