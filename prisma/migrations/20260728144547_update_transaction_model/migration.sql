/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Completed';

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_reference_key" ON "Transaction"("reference");
