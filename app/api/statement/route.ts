import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import path from "path";

import { getCurrentCustomer } from "@/lib/currentCustomer";

export const runtime = "nodejs";

export async function GET() {
  try {
    const customer = await getCurrentCustomer();

    const fullName = [
      customer.application.firstName,
      customer.application.middleName,
      customer.application.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    const currency = customer.application.preferredCurrency;

    const currencySymbols: Record<string, string> = {
      USD: "$",
      GBP: "£",
      EUR: "€",
      GHS: "GH₵",
    };

    const symbol = currencySymbols[currency] ?? currency;

    const transactions = [...customer.transactions].sort(
      (a, b) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
    );

    const isCredit = (type: string) =>
      type === "Deposit" || type === "Transfer In";

    const totalDeposits = transactions
      .filter((transaction) => isCredit(transaction.type))
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalWithdrawals = transactions
      .filter((transaction) => !isCredit(transaction.type))
      .reduce((total, transaction) => total + transaction.amount, 0);

    const netMovement = totalDeposits - totalWithdrawals;

    const openingBalance = customer.balance - netMovement;

    const statementStart =
      transactions.length > 0
        ? new Date(transactions[0].transactionDate)
        : new Date();

    const statementEnd =
      transactions.length > 0
        ? new Date(
            transactions[transactions.length - 1].transactionDate
          )
        : new Date();

    const formatMoney = (amount: number) =>
      `${symbol}${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;

    const formatDate = (date: Date) =>
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    const formatLongDate = (date: Date) =>
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

    const document = new PDFDocument({
      size: "A4",
      margin: 50,
      bufferPages: true,
    });

    const chunks: Buffer[] = [];

    document.on("data", (chunk) => {
      chunks.push(chunk);
    });

    const pdfPromise = new Promise<Buffer>((resolve, reject) => {
      document.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      document.on("error", reject);
    });

    const logoPath = path.join(
  process.cwd(),
  "public",
  "logo.png"
);

    /*
     * Header
     */

    document.image(logoPath, 50, 42, {
      fit: [125, 70],
    });

    document
      .font("Helvetica-Bold")
      .fontSize(19)
      .fillColor("#0f172a")
      .text("UNIVERSAL STANDARD BANK", 195, 48);

    document
  .font("Helvetica")
  .fontSize(9)
  .fillColor("#64748b")
  .text("33 St James's Square", 195, 88)
  .text("St James's, London SW1Y 4JS", 195, 101)
  .text("England", 195, 114)
  .text("Tel: +44 79 536 23468  |  +44 73 554 53466", 195, 127);

    document
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#0f172a")
      .text("ACCOUNT STATEMENT", 350, 145, {
        width: 195,
        align: "right",
      });

    document
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#64748b")
      .text(`Generated: ${formatLongDate(new Date())}`, 350, 168, {
        width: 195,
        align: "right",
      });

    document
      .moveTo(50, 190)
      .lineTo(545, 190)
      .lineWidth(1)
      .strokeColor("#cbd5e1")
      .stroke();

    /*
     * Customer Information
     */

    document
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor("#0f172a")
      .text("CUSTOMER INFORMATION", 50, 215);

    document
      .roundedRect(50, 237, 495, 145, 8)
      .fillColor("#e2e8f0")
      .fill();

    document
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#475569")
      .text("CUSTOMER NAME", 68, 255)
.text("ACCOUNT NUMBER", 310, 255)
.text("ACCOUNT TYPE", 68, 298)
.text("CURRENCY", 310, 298)
.text("CUSTOMER ADDRESS", 68, 341);

    document
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#0f172a")
      .text(fullName, 68, 270)
.text(customer.accountNumber, 310, 270)
.text(customer.application.accountType, 68, 313)
.text(currency, 310, 313)
.text(
  [
    customer.application.residentialAddress,
    customer.application.city,
    customer.application.state,
    customer.application.postalCode,
    customer.application.country,
  ]
    .filter(Boolean)
    .join(", "),
  68,
  356,
  {
    width: 430,
  }
);

   /*
 * Statement Information
 */

document
  .font("Helvetica-Bold")
  .fontSize(12)
  .fillColor("#0f172a")
  .text("STATEMENT INFORMATION", 50, 415);

document
  .roundedRect(50, 437, 495, 88, 8)
  .fillColor("#e2e8f0")
  .fill();

document
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor("#475569")
  .text("STATEMENT PERIOD", 68, 455)
  .text("ACCOUNT STATUS", 310, 455)
  .text("OPENING BALANCE", 68, 490)
  .text("CLOSING BALANCE", 310, 490);

document
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#0f172a")
  .text(
    `${formatDate(statementStart)} - ${formatDate(statementEnd)}`,
    68,
    470
  )
  .text(customer.accountStatus, 310, 470)
  .text(formatMoney(openingBalance), 68, 505)
  .text(formatMoney(customer.balance), 310, 505);

/*
 * Account Summary
 */

document
  .font("Helvetica-Bold")
  .fontSize(12)
  .fillColor("#0f172a")
  .text("ACCOUNT SUMMARY", 50, 555);

document
  .roundedRect(50, 577, 155, 70, 8)
  .fillColor("#f0fdf4")
  .fill();

document
  .roundedRect(220, 577, 155, 70, 8)
  .fillColor("#fef2f2")
  .fill();

document
  .roundedRect(390, 577, 155, 70, 8)
  .fillColor("#eff6ff")
  .fill();

document
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor("#475569")
  .text("TOTAL DEPOSITS", 65, 592)
  .text("TOTAL WITHDRAWALS", 235, 592)
  .text("CURRENT BALANCE", 405, 592);

document
  .font("Helvetica-Bold")
  .fontSize(13)
  .fillColor("#15803d")
  .text(formatMoney(totalDeposits), 65, 615);

document
  .fillColor("#dc2626")
  .text(formatMoney(totalWithdrawals), 235, 615);

document
  .fillColor("#1d4ed8")
  .text(formatMoney(customer.balance), 405, 615);

    /*
     * Transaction History
     */

    document
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor("#0f172a")
      .text("TRANSACTION HISTORY", 50, 650);

    const drawTableHeader = () => {
      const y = document.y + 10;

      document
        .rect(50, y, 495, 25)
        .fillColor("#e2e8f0")
        .fill();

      document
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor("#334155")
        .text("DATE", 58, y + 8, { width: 58 })
        .text("DESCRIPTION", 116, y + 8, { width: 120 })
        .text("REFERENCE", 236, y + 8, { width: 100 })
        .text("TYPE", 336, y + 8, { width: 70 })
        .text("AMOUNT", 406, y + 8, {
          width: 70,
          align: "right",
        })
        .text("STATUS", 476, y + 8, {
          width: 65,
          align: "right",
        });

      document.y = y + 32;
    };

    drawTableHeader();

    for (const transaction of transactions) {
      if (document.y > 710) {
        document.addPage();

        document
          .font("Helvetica-Bold")
          .fontSize(12)
          .fillColor("#0f172a")
          .text("TRANSACTION HISTORY (CONTINUED)", 50, 50);

        document.y = 75;

        drawTableHeader();
      }

      const credit = isCredit(transaction.type);

      const amount = `${credit ? "+" : "-"}${formatMoney(
        transaction.amount
      )}`;

      const rowY = document.y;

      if (transactions.indexOf(transaction) % 2 === 1) {
        document
          .rect(50, rowY - 4, 495, 32)
          .fillColor("#f8fafc")
          .fill();
      }

      document
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor("#334155")
        .text(formatDate(new Date(transaction.transactionDate)), 58, rowY, {
          width: 58,
        })
        .text(transaction.description || "-", 116, rowY, {
          width: 120,
          ellipsis: true,
        })
        .text(transaction.reference || "-", 236, rowY, {
          width: 100,
          ellipsis: true,
        })
        .text(transaction.type, 336, rowY, {
          width: 70,
          ellipsis: true,
        })
        .fillColor(credit ? "#15803d" : "#dc2626")
        .font("Helvetica-Bold")
        .text(amount, 406, rowY, {
          width: 70,
          align: "right",
        })
        .fillColor("#334155")
        .font("Helvetica")
        .text(transaction.status || "-", 476, rowY, {
          width: 65,
          align: "right",
          ellipsis: true,
        });

      document
        .moveTo(50, rowY + 23)
        .lineTo(545, rowY + 23)
        .lineWidth(0.5)
        .strokeColor("#e2e8f0")
        .stroke();

      document.y = rowY + 30;
    }

    if (transactions.length === 0) {
      document
        .font("Helvetica")
        .fontSize(9)
        .fillColor("#64748b")
        .text("No transactions found.", {
          align: "center",
        });
    }

    /*
     * Footer and page numbers
     */

    const pageRange = document.bufferedPageRange();

    for (
      let pageIndex = 0;
      pageIndex < pageRange.count;
      pageIndex++
    ) {
      document.switchToPage(pageRange.start + pageIndex);

      document
        .font("Helvetica")
        .fontSize(8)
        .fillColor("#64748b")
        .text(
  "This statement is generated electronically by Universal Standard Bank.",
  50,
  750,
  {
    width: 495,
    align: "center",
  }
);

document
  .fontSize(8)
  .text(
    `Page ${pageIndex + 1} of ${pageRange.count}`,
    50,
    765,
    {
      width: 495,
      align: "center",
    }
  );
}
    document.end();

    const pdfBuffer = await pdfPromise;

    return new NextResponse(pdfBuffer as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="standard-union-bank-statement-${customer.accountNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Statement generation error:", error);

    return NextResponse.json(
      {
        error: "Unable to generate statement.",
      },
      {
        status: 500,
      }
    );
  }
}