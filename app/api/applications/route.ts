import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if email already exists
    const existingApplication = await prisma.application.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: "An application with this email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    // Hash password and PIN
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const hashedPin = await bcrypt.hash(body.pin, 10);

    // Save application
    const application = await prisma.application.create({
      data: {
        firstName: body.firstName,
        middleName: body.middleName || null,
        lastName: body.lastName,
        dateOfBirth: new Date(body.dateOfBirth),
        gender: body.gender,
        nationality: body.nationality,

        email: body.email,
        phoneNumber: body.phoneNumber,

        residentialAddress: body.residentialAddress,
        country: body.country,
        state: body.state,
        city: body.city,
        postalCode: body.postalCode,

        idType: body.idType,
        idNumber: body.idNumber,
        idExpiryDate: new Date(body.idExpiryDate),

        accountType: body.accountType,
        preferredCurrency: body.preferredCurrency,

        occupation: body.occupation,
        employer: body.employer || null,

        password: hashedPassword,
        pin: hashedPin,

        passportPhoto: body.passportPhoto || null,
governmentId: body.governmentId || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
      applicationId: application.id,
    });
  } catch (error) {
    console.error("Application Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application.",
      },
      {
        status: 500,
      }
    );
  }
}