// pages/api/upload.js
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Get the query parameter "binarystring" from the request
  const { searchParams } = new URL(req.url);
  const data = await req.formData();

  const binarystring = data.get("string")?.toString();

  // Ensure binarystring is provided
  if (!binarystring) {
    return NextResponse.redirect(
      '/error?message=Missing%20"binarystring"%20query%20parameter',
      { status: 400 },
    );
  }
  try {
    const response = await fetch(
      `http://localhost:3301/caption?caption=${encodeURIComponent(binarystring)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from server");
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the response from the server
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching from server" },
      { status: 500 },
    );
  }
}
