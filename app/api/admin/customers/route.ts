import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomInt } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";
import { verifyToken } from "@/lib/auth";

async function generateAccountNumber() {
  while (true) {
    const randomDigits = randomInt(0, 1_000_000_000)
      .toString()
      .padStart(9, "0");

    const accountNumber = `210${randomDigits}`;

    const existingCustomer = await prisma.customer.findUnique({
      where: {
        accountNumber,
      },
    });

    if (!existingCustomer) {
      return accountNumber;
    }
  }
}

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value;

    if (!adminToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Admin login required.",
        },
        { status: 401 }
      );
    }

    try {
      const payload = await verifyToken(adminToken);

      if (payload.type !== "admin" || !payload.adminId) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized.",
          },
          { status: 401 }
        );
      }
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Your admin session has expired. Please log in again.",
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const firstName = String(formData.get("firstName") || "").trim();
    const middleName = String(formData.get("middleName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const phoneNumber = String(formData.get("phoneNumber") || "").trim();
    const dateOfBirth = String(formData.get("dateOfBirth") || "");
    const gender = String(formData.get("gender") || "").trim();
    const nationality = String(formData.get("nationality") || "").trim();

    const residentialAddress = String(
      formData.get("residentialAddress") || ""
    ).trim();

    const country = String(formData.get("country") || "").trim();
    const state = String(formData.get("state") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const postalCode = String(formData.get("postalCode") || "").trim();

    const idType = String(formData.get("idType") || "").trim();
    const idNumber = String(formData.get("idNumber") || "").trim();
    const idExpiryDate = String(formData.get("idExpiryDate") || "");

    const accountType = String(formData.get("accountType") || "").trim();
    const preferredCurrency = String(
      formData.get("preferredCurrency") || ""
    ).trim();

    const occupation = String(formData.get("occupation") || "").trim();
    const employer = String(formData.get("employer") || "").trim();

    const password = String(formData.get("password") || "");
    const pin = String(formData.get("pin") || "");

    const requestedAccountNumber = String(
      formData.get("accountNumber") || ""
    ).trim();

    const openingBalanceString = String(
      formData.get("openingBalance") || "0"
    ).trim();

    const openingBalance = Number(openingBalanceString);

    const passportPhoto = formData.get("passportPhoto");
    const governmentId = formData.get("governmentId");

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !dateOfBirth ||
      !gender ||
      !nationality ||
      !residentialAddress ||
      !country ||
      !state ||
      !city ||
      !postalCode ||
      !idType ||
      !idNumber ||
      !idExpiryDate ||
      !accountType ||
      !preferredCurrency ||
      !occupation ||
      !password ||
      !pin
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{4,6}$/.test(pin)) {
      return NextResponse.json(
        {
          success: false,
          message: "PIN must contain 4 to 6 digits.",
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(openingBalance) || openingBalance < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Opening balance must be a valid amount.",
        },
        { status: 400 }
      );
    }

    if (Number.isNaN(new Date(dateOfBirth).getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid date of birth.",
        },
        { status: 400 }
      );
    }

    if (Number.isNaN(new Date(idExpiryDate).getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid ID expiry date.",
        },
        { status: 400 }
      );
    }

    // Check whether email already exists
    const existingApplication = await prisma.application.findUnique({
      where: {
        email,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A customer or application with this email already exists.",
        },
        { status: 409 }
      );
    }

    // Determine account number
    let accountNumber: string;

    if (requestedAccountNumber) {
      // Manual account number must be exactly 12 digits
      if (!/^\d{12}$/.test(requestedAccountNumber)) {
        return NextResponse.json(
          {
            success: false,
            message: "Account number must be exactly 12 digits.",
          },
          { status: 400 }
        );
      }

      // Check whether manually entered account number already exists
      const existingCustomer = await prisma.customer.findUnique({
        where: {
          accountNumber: requestedAccountNumber,
        },
      });

      if (existingCustomer) {
        return NextResponse.json(
          {
            success: false,
            message: "That account number is already in use.",
          },
          { status: 409 }
        );
      }

      accountNumber = requestedAccountNumber;
    } else {
      // Generate automatically if admin leaves the field blank
      accountNumber = await generateAccountNumber();
    }

    // Hash password and PIN
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = await bcrypt.hash(pin, 10);

    // Upload documents if provided
    let passportPhotoUrl: string | null = null;
    let governmentIdUrl: string | null = null;

    if (passportPhoto instanceof File && passportPhoto.size > 0) {
      passportPhotoUrl = await saveUploadedFile(
        passportPhoto,
        "passports"
      );
    }

    if (governmentId instanceof File && governmentId.size > 0) {
      governmentIdUrl = await saveUploadedFile(
        governmentId,
        "government-ids"
      );
    }

    // Create application and customer together
    const result = await prisma.$transaction(async (tx) => {
      const application = await tx.application.create({
        data: {
          firstName,
          middleName: middleName || null,
          lastName,
          dateOfBirth: new Date(dateOfBirth),
          gender,
          email,
          phoneNumber,
          residentialAddress,
          country,
          state,
          city,
          postalCode,
          idType,
          idNumber,
          idExpiryDate: new Date(idExpiryDate),
          nationality,
          accountType,
          preferredCurrency,
          occupation,
          employer: employer || null,
          password: hashedPassword,
          pin: hashedPin,
          passportPhoto: passportPhotoUrl,
          governmentId: governmentIdUrl,
          status: "Approved",
        },
      });

      const customer = await tx.customer.create({
        data: {
          applicationId: application.id,
          accountNumber,
          balance: openingBalance,
          accountStatus: "Active",
        },
      });

      return {
        application,
        customer,
      };
    });

    console.log(
      "Admin created customer:",
      result.customer.accountNumber
    );

    return NextResponse.json({
      success: true,
      message: "Customer created successfully.",
      accountNumber: result.customer.accountNumber,
      customerId: result.customer.id,
    });
  } catch (error) {
    console.error("Admin customer creation failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create customer.",
      },
      { status: 500 }
    );
  }
}