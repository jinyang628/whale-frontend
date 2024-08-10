import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const accessToken = cookies().get('linearAccessToken')?.value;
  return NextResponse.json({ isAuthenticated: !!accessToken });
}