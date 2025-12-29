/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `userCanvas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userCanvas_userId_key" ON "userCanvas"("userId");
