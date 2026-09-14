import { Prisma } from "@prisma/client";

export type CurrentCustomer = Prisma.CustomerGetPayload<{
  include: {
    application: true;
    transactions: {
      orderBy: {
        createdAt: "desc";
      };
    };
  };
}>;