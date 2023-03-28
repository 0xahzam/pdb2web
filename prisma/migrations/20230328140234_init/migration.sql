-- CreateTable
CREATE TABLE "pdbCollection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "randomStr" TEXT NOT NULL DEFAULT (hex(randomblob(5)) || hex(randomblob(5))),
    "pdb" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "selection" TEXT NOT NULL,
    "randSt" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pdbCollection_randomStr_key" ON "pdbCollection"("randomStr");
