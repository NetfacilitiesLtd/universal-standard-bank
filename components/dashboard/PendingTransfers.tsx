import { prisma } from "@/lib/prisma";
import PendingTransfersClient from "./PendingTransfersClient";

type Props = {
  customerId: string;
};

export default async function PendingTransfers({
  customerId,
}: Props) {
  const transfers = await prisma.internationalTransfer.findMany({
    where: {
      customerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <PendingTransfersClient
      transfers={transfers.map((transfer) => ({
        id: transfer.id,
        recipientName: transfer.recipientName,
        currency: transfer.currency,
        amount: Number(transfer.amount),
        status: transfer.status,
      }))}
    />
  );
}