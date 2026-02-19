import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
      { id: 1, name: "Track 1" },
          { id: 2, name: "Track 2" }
            ]);
            }