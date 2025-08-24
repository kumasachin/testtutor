import { NextResponse } from "next/server";

export async function POST() {
  // In a real app, you might invalidate the token in a blacklist or database
  // For now, we'll just return success since client will remove the token

  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
}
