import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const state = searchParams.get('state');
  const storedState = cookies().get('linearAuthState')?.value;

  if (!state || state !== storedState) {
    return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 });
  }

  cookies().delete('linearAuthState');

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

    // Store the access token in an HTTP-only, secure cookie
    cookies().set('linearAccessToken', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: tokenData.expires_in // Set the expiration based on the token's expiry
    });
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}`);

  } catch (error) {
    console.error('Error fetching data from Linear:', error);
    return NextResponse.json({ error: 'Failed to retrieve access token' }, { status: 500 });
  }
}
