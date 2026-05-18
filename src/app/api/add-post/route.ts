import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const doc = {
      _type: "post",
      title: body.title,
    };

    const result = await client.create(doc);

    return NextResponse.json({
      message: "Post created!",
      data: result,
    });
  } catch (error) {
    console.error("Sanity Error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
