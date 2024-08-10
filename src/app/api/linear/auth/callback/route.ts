import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
  }

  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.LINEAR_CLIENT_ID as string);
    params.append('client_secret', process.env.LINEAR_CLIENT_SECRET as string);
    params.append('code', code);
    params.append('redirect_uri', `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}/api/linear/auth/callback`);
    params.append('grant_type', 'authorization_code');

    const response = await axios.post('https://api.linear.app/oauth/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokenData = response.data;

    // Store tokenData in a secure location (e.g., database, session, etc.)
    // For now, just return it in the response
    return NextResponse.json(tokenData);
  } catch (error) {
    console.error('Error fetching data from Linear:', error);
    return NextResponse.json({ error: 'Failed to retrieve access token' }, { status: 500 });
  }
}
