import { NextResponse } from "next/server";
import { saveUploadedFile } from "@/lib/upload";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const passportPhoto = formData.get("passportPhoto") as File | null;
const governmentId = formData.get("governmentId") as File | null;
    if (!passportPhoto) {
      return NextResponse.json(
        {
          success: false,
          message: "No passport photo uploaded.",
        },
        { status: 400 }
      );
    }
if (!governmentId) {
  return NextResponse.json(
    {
      success: false,
      message: "No government ID uploaded.",
    },
    { status: 400 }
  );
}
    if (passportPhoto.size === 0) {
  return NextResponse.json(
    {
      success: false,
      message: "Please select a passport photo.",
    },
    { status: 400 }
  );
}
   const passportPath = await saveUploadedFile(
  passportPhoto,
  "passports"
);
const governmentIdPath = await saveUploadedFile(
  governmentId,
  "government-ids"
);
    return NextResponse.json({
  success: true,
  passportPhoto: passportPath,
  governmentId: governmentIdPath,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed.",
      },
      { status: 500 }
    );
  }
}