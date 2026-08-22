import { NextRequest, NextResponse } from 'next/server';

const TALLY_BASE = process.env.NEXT_PUBLIC_TALLY_API_BASE_URL || '';
const TALLY_API_KEY = process.env.TALLY_API_KEY || '';

// Preview files that would be deleted under a folder prefix — no actual deletion.
export async function GET(req: NextRequest) {
  try {
    const prefix = req.nextUrl.searchParams.get('prefix') || '';
    if (!prefix) {
      return NextResponse.json({ error: 'prefix is required' }, { status: 400 });
    }
    const res = await fetch(`${TALLY_BASE}/files/to_delete?prefix=${encodeURIComponent(prefix)}`, {
      headers: { Accept: 'application/json', 'X-API-Key': TALLY_API_KEY },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to list files to delete' }, { status: 500 });
  }
}
