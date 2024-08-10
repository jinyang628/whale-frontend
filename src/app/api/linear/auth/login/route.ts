import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';

export async function GET() {
  
  const state = uuidv4();
  cookies().set('linearAuthState', state, { httpOnly: true, secure: true });

  const linearAuthUrl = `https://linear.app/oauth/authorize?response_type=code&client_id=${process.env.LINEAR_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}/api/linear/auth/callback`)}&scope=read,write,issues:create,comments:create&state=${state}`;
  
  return NextResponse.redirect(linearAuthUrl);
}
