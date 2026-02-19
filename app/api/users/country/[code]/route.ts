import { NextResponse } from 'next/server';
import { getUsersByCountry } from '@/lib/data-store';
import { getCountryByCode } from '@/lib/countries';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const country = getCountryByCode(code);
    
    if (!country) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }

    const users = getUsersByCountry(code);
    
    return NextResponse.json({
      country,
      users,
      count: users.length,
    });
  } catch (error) {
    console.error('[v0] Error fetching country users:', error);
    return NextResponse.json({ error: 'Failed to fetch country users' }, { status: 500 });
  }
}
