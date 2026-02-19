import { NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const files = data.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files" }, { status: 400 });
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products" }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            })
            .end(buffer);
        });
      })
    );

    return NextResponse.json(uploads);
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
