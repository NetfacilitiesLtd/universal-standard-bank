import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.USB_BLOB_READ_WRITE_TOKEN,

      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const payload = clientPayload
          ? JSON.parse(clientPayload)
          : null;

        const folder =
          payload?.folder === "government-ids"
            ? "government-ids"
            : payload?.folder === "passports"
              ? "passports"
              : null;

        if (!folder || !pathname.startsWith(`${folder}/`)) {
          throw new Error("Invalid upload destination.");
        }

        const allowedContentTypes =
          folder === "passports"
            ? [
                "image/jpeg",
                "image/png",
                "image/webp",
              ]
            : [
                "image/jpeg",
                "image/png",
                "image/webp",
                "application/pdf",
              ];

        return {
          allowedContentTypes,
          maximumSizeInBytes: 10 * 1024 * 1024,
          addRandomSuffix: true,
          validUntil: Date.now() + 15 * 60 * 1000,
        };
      },

      onUploadCompleted: async () => {
        // Upload completed successfully.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Client upload token error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Upload authorization failed.",
      },
      { status: 400 }
    );
  }
}