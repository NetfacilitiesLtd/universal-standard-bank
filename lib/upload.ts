import { put } from "@vercel/blob";

export async function saveUploadedFile(
  file: File,
  folder: "passports" | "government-ids"
) {
  const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const blob = await put(fileName, file, {
    access: "private",
    addRandomSuffix: true,
  });

  return blob.url;
}