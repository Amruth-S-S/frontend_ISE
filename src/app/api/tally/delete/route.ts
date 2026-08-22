import { NextRequest, NextResponse } from 'next/server';

const TALLY_BASE = process.env.NEXT_PUBLIC_TALLY_API_BASE_URL || '';
const TALLY_API_KEY = process.env.TALLY_API_KEY || '';

// Delete all files under a folder prefix in the GCS bucket. Destructive — the
// UI must confirm with the user before calling this (see transactionData.tsx).
export async function DELETE(req: NextRequest) {
  try {
    const prefix = req.nextUrl.searchParams.get('prefix') || '';
    if (!prefix) {
      return NextResponse.json({ error: 'prefix is required' }, { status: 400 });
    }
    const res = await fetch(`${TALLY_BASE}/delete?prefix=${encodeURIComponent(prefix)}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json', 'X-API-Key': TALLY_API_KEY },
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
