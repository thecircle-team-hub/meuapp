import { NextResponse } from 'next/server';
import { getAllUsers, addUser } from '@/lib/data-store';

export async function GET() {
  try {
    const users = getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('[v0] Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.fullName || !body.nationality || !body.twitterUsername) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure Twitter username has @ prefix
    const twitterUsername = body.twitterUsername.startsWith('@')
      ? body.twitterUsername
      : `@${body.twitterUsername}`;

    // Add user with simulated activity data
    const newUser = addUser({
      fullName: body.fullName,
      nationality: body.nationality,
      twitterUsername,
      posts: Math.floor(Math.random() * 100) + 50, // Random 50-150
      interactions: Math.floor(Math.random() * 120) + 80, // Random 80-200
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('[v0] Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
