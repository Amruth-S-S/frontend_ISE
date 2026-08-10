import { NextResponse } from 'next/server';

const TALLY_BASE = process.env.NEXT_PUBLIC_TALLY_API_BASE_URL || '';
const TALLY_API_KEY = process.env.TALLY_API_KEY || '';

export async function GET() {
  try {
    const res = await fetch(`${TALLY_BASE}/List_folders`, { headers: { Accept: 'application/json', 'X-API-Key': TALLY_API_KEY } });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to list folders' }, { status: 500 });
  }
}
