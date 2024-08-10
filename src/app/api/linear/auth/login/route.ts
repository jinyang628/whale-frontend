import { NextResponse } from 'next/server';

export async function GET() {
  const linearAuthUrl = `https://linear.app/oauth/authorize?response_type=code&client_id=${process.env.LINEAR_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}/api/linear/auth/callback`)}`;
  
  return NextResponse.redirect(linearAuthUrl);
}
