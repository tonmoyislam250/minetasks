-- CreateTable
CREATE TABLE "exampledb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exampledb_pkey" PRIMARY KEY ("id")
);
