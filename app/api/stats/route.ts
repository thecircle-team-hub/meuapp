import { NextResponse } from 'next/server';
import { getCountryStats, getMaxCountryUserCount } from '@/lib/data-store';

export async function GET() {
  try {
    const stats = getCountryStats();
    const maxCount = getMaxCountryUserCount();
    
    return NextResponse.json({
      stats,
      maxCount,
    });
  } catch (error) {
    console.error('[v0] Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
