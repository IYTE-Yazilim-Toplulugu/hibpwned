// src/app/api/check-email/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  const apiKey = process.env.HAVEIBEENPWNED_API_KEY; // Store API key securely

  if (!apiKey) {
    return NextResponse.json({ message: 'API key is not set' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
      headers: {
        'hibp-api-key': apiKey, // Ensure this is defined
        'User-Agent': 'YourAppName', // Required by the HIBP API
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Error fetching breach data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
