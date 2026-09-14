-- CreateTable
CREATE TABLE "InternationalTransfer" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankAddress" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "swiftCode" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "purpose" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending Transfer Code',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternationalTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InternationalTransfer" ADD CONSTRAINT "InternationalTransfer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
