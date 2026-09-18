import { prisma } from "@/lib/prisma";
import { verifyTransferCode } from "@/lib/actions/customer";
import TransferDetailsClient from "@/components/dashboard/TransferDetailsClient";

export default async function TransferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const transfer = await prisma.internationalTransfer.findUnique({
    where: {
      id,
    },
  });

  if (!transfer) {
    return <div>Transfer not found.</div>;
  }

  return (
    <TransferDetailsClient
      transfer={{
        id: transfer.id,
        recipientName: transfer.recipientName,
        bankName: transfer.bankName,
        currency: transfer.currency,
        amount: Number(transfer.amount),
        status: transfer.status,
      }}
      verifyTransferCode={verifyTransferCode}
    />
  );
}