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
    // Construct the API URL with truncateResponse set to false
    const apiUrl = `https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'hibp-api-key': apiKey, // Ensure this is defined
        'User-Agent': 'YourAppName', // Required by the HIBP API
      },
    });

    if (response.status === 404) {
      return NextResponse.json({ message: "You're Safe." }, { status: response.status });
    } else if (response.status === 429) {
      return NextResponse.json({ message: "Rate limit is exceeded. Try again in 2 seconds." }, { status: response.status });
    } else if (!response.ok) {
      return NextResponse.json({ message: 'Error fetching breach data' }, { status: response.status });
    }

    const data = await response.json();

    // Map the data to include necessary fields
    const formattedData = data.map((breach: any) => ({
      name: breach.Name,
      breachDate: breach.BreachDate,
      logo: breach.LogoPath, // Assuming the API provides a LogoPath
      dataClasses: breach.DataClasses,
      description: breach.Description,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
