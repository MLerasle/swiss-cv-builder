import { writeFileSync } from "fs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("picture");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  writeFileSync(`/tmp/${file.name}`, buffer);

  return NextResponse.json({ success: true });
}
