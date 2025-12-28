-- DropIndex
DROP INDEX "Chat_roomId_key";

-- CreateTable
CREATE TABLE "Canvas" (
    "id" SERIAL NOT NULL,
    "content" JSONB NOT NULL,
    "roomId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Canvas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Canvas_roomId_key" ON "Canvas"("roomId");

-- AddForeignKey
ALTER TABLE "Canvas" ADD CONSTRAINT "Canvas_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
