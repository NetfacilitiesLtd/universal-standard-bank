-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "residentialAddress" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "idType" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "idExpiryDate" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "preferredCurrency" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "employer" TEXT,
    "password" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "passportPhoto" TEXT,
    "governmentId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_email_key" ON "Application"("email");
