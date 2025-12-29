-- CreateTable
CREATE TABLE "userCanvas" (
    "id" SERIAL NOT NULL,
    "content" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "userCanvas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userCanvas" ADD CONSTRAINT "userCanvas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
