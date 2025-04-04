import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://fallback-url.com';

// 🚨 Add this line to force runtime handling and avoid static generation
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { features } = await req.json();

    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ features }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ prediction: data.prediction });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
