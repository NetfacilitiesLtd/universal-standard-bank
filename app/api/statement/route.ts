import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import path from "path";
import { cookies } from "next/headers";

import { getCurrentCustomer } from "@/lib/currentCustomer";

export const runtime = "nodejs";

const translations = {
  en: {
    locale: "en-GB",
    statement: "ACCOUNT STATEMENT",
    generated: "Generated",
    customerInformation: "CUSTOMER INFORMATION",
    customerName: "CUSTOMER NAME",
    accountNumber: "ACCOUNT NUMBER",
    accountType: "ACCOUNT TYPE",
    currency: "CURRENCY",
    customerAddress: "CUSTOMER ADDRESS",
    statementInformation: "STATEMENT INFORMATION",
    statementPeriod: "STATEMENT PERIOD",
    accountStatus: "ACCOUNT STATUS",
    openingBalance: "OPENING BALANCE",
    closingBalance: "CLOSING BALANCE",
    accountSummary: "ACCOUNT SUMMARY",
    totalDeposits: "TOTAL DEPOSITS",
    totalWithdrawals: "TOTAL WITHDRAWALS",
    currentBalance: "CURRENT BALANCE",
    transactionHistory: "TRANSACTION HISTORY",
    continued: "TRANSACTION HISTORY (CONTINUED)",
    date: "DATE",
    description: "DESCRIPTION",
    reference: "REFERENCE",
    type: "TYPE",
    amount: "AMOUNT",
    status: "STATUS",
    noTransactions: "No transactions found.",
    footer:
      "This statement is generated electronically by Universal Standard Bank.",
    page: "Page",
  },

  de: {
    locale: "de-DE",
    statement: "KONTOAUSZUG",
    generated: "Erstellt",
    customerInformation: "KUNDENINFORMATIONEN",
    customerName: "KUNDENNAME",
    accountNumber: "KONTONUMMER",
    accountType: "KONTOTYP",
    currency: "WÄHRUNG",
    customerAddress: "KUNDENADRESSE",
    statementInformation: "AUSZUGSINFORMATIONEN",
    statementPeriod: "AUSZUGSZEITRAUM",
    accountStatus: "KONTOSTATUS",
    openingBalance: "ANFANGSSALDO",
    closingBalance: "ENDSALDO",
    accountSummary: "KONTOÜBERSICHT",
    totalDeposits: "GESAMTEINZAHLUNGEN",
    totalWithdrawals: "GESAMTAUSZAHLUNGEN",
    currentBalance: "AKTUELLER KONTOSTAND",
    transactionHistory: "TRANSAKTIONSVERLAUF",
    continued: "TRANSAKTIONSVERLAUF (FORTSETZUNG)",
    date: "DATUM",
    description: "BESCHREIBUNG",
    reference: "REFERENZ",
    type: "TYP",
    amount: "BETRAG",
    status: "STATUS",
    noTransactions: "Keine Transaktionen gefunden.",
    footer:
      "Dieser Kontoauszug wurde elektronisch von der Universal Standard Bank erstellt.",
    page: "Seite",
  },

  fr: {
    locale: "fr-FR",
    statement: "RELEVÉ DE COMPTE",
    generated: "Généré",
    customerInformation: "INFORMATIONS CLIENT",
    customerName: "NOM DU CLIENT",
    accountNumber: "NUMÉRO DE COMPTE",
    accountType: "TYPE DE COMPTE",
    currency: "DEVISE",
    customerAddress: "ADRESSE DU CLIENT",
    statementInformation: "INFORMATIONS DU RELEVÉ",
    statementPeriod: "PÉRIODE DU RELEVÉ",
    accountStatus: "STATUT DU COMPTE",
    openingBalance: "SOLDE D'OUVERTURE",
    closingBalance: "SOLDE DE CLÔTURE",
    accountSummary: "RÉSUMÉ DU COMPTE",
    totalDeposits: "TOTAL DES DÉPÔTS",
    totalWithdrawals: "TOTAL DES RETRAITS",
    currentBalance: "SOLDE ACTUEL",
    transactionHistory: "HISTORIQUE DES TRANSACTIONS",
    continued: "HISTORIQUE DES TRANSACTIONS (SUITE)",
    date: "DATE",
    description: "DESCRIPTION",
    reference: "RÉFÉRENCE",
    type: "TYPE",
    amount: "MONTANT",
    status: "STATUT",
    noTransactions: "Aucune transaction trouvée.",
    footer:
      "Ce relevé est généré électroniquement par Universal Standard Bank.",
    page: "Page",
  },
} as const;

export async function GET() {
  try {
    const customer = await getCurrentCustomer();

    const cookieStore = await cookies();
    const language = cookieStore.get("usb-language")?.value ?? "en";

    const t =
      translations[language as keyof typeof translations] ??
      translations.en;

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
      date.toLocaleDateString(t.locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    const formatLongDate = (date: Date) =>
      date.toLocaleDateString(t.locale, {
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
      .text(t.statement, 350, 145, {
        width: 195,
        align: "right",
      });

    document
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#64748b")
      .text(`${t.generated}: ${formatLongDate(new Date())}`, 350, 168, {
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
      .text(t.customerInformation, 50, 215);

    document
      .roundedRect(50, 237, 495, 145, 8)
      .fillColor("#e2e8f0")
      .fill();

    document
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#475569")
      .text(t.customerName, 68, 255)
      .text(t.accountNumber, 310, 255)
      .text(t.accountType, 68, 298)
      .text(t.currency, 310, 298)
      .text(t.customerAddress, 68, 341);

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
      .text(t.statementInformation, 50, 415);

    document
      .roundedRect(50, 437, 495, 88, 8)
      .fillColor("#e2e8f0")
      .fill();

    document
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#475569")
      .text(t.statementPeriod, 68, 455)
      .text(t.accountStatus, 310, 455)
      .text(t.openingBalance, 68, 490)
      .text(t.closingBalance, 310, 490);

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
      .text(t.accountSummary, 50, 555);

    document
      .roundedRect(50, 577, 155, 70, 8)
      .fillColor("#f0fdf4")
      .fill();

    document
      .roundedRect(220, 577, 155, 70, 8)
      .fillColor("#fef2f2")
      .fill();

    document
      .roundedRect(390, 577, 155, 70)
      .fillColor("#eff6ff")
      .fill();

    document
      .font("Helvetica-Bold")
      .fontSize(8)
      .fillColor("#475569")
      .text(t.totalDeposits, 65, 592)
      .text(t.totalWithdrawals, 235, 592)
      .text(t.currentBalance, 405, 592);

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
      .text(t.transactionHistory, 50, 650);

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
        .text(t.date, 58, y + 8, { width: 58 })
        .text(t.description, 116, y + 8, { width: 120 })
        .text(t.reference, 236, y + 8, { width: 100 })
        .text(t.type, 336, y + 8, { width: 70 })
        .text(t.amount, 406, y + 8, {
          width: 70,
          align: "right",
        })
        .text(t.status, 476, y + 8, {
          width: 65,
          align: "right",
        });

      document.y = y + 32;
    };

    drawTableHeader();

    for (const transaction of transactions) {
  const credit = isCredit(transaction.type);

  const amount = `${credit ? "+" : "-"}${formatMoney(
    transaction.amount
  )}`;

  const description = transaction.description || "-";
  const reference = transaction.reference || "-";

  const descriptionHeight = document.heightOfString(description, {
    width: 120,
  });

  const referenceHeight = document.heightOfString(reference, {
    width: 100,
  });

  const rowHeight = Math.max(
    30,
    descriptionHeight + 8,
    referenceHeight + 8
  );

  if (document.y + rowHeight > 740) {
    document.addPage();

    document
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor("#0f172a")
      .text(t.continued, 50, 50);

    document.y = 75;

    drawTableHeader();
  }

  const rowY = document.y;

  if (transactions.indexOf(transaction) % 2 === 1) {
    document
      .rect(50, rowY - 4, 495, rowHeight)
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
    .text(description, 116, rowY, {
      width: 120,
    })
    .text(reference, 236, rowY, {
      width: 100,
    })
    .text(transaction.type, 336, rowY, {
      width: 70,
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
    });

  document
    .moveTo(50, rowY + rowHeight)
    .lineTo(545, rowY + rowHeight)
    .lineWidth(0.5)
    .strokeColor("#e2e8f0")
    .stroke();

  document.y = rowY + rowHeight + 2;
}
    if (transactions.length === 0) {
      document
        .font("Helvetica")
        .fontSize(9)
        .fillColor("#64748b")
        .text(t.noTransactions, {
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
        .text(t.footer, 50, 750, {
          width: 495,
          align: "center",
        });

      document
        .fontSize(8)
        .text(
          `${t.page} ${pageIndex + 1} of ${pageRange.count}`,
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
        "Content-Disposition": `attachment; filename="universal-standard-bank-statement-${customer.accountNumber}.pdf"`,
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