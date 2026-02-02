import { DigestResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchDigest(category: string): Promise<DigestResponse> {
  const res = await fetch(`${API_URL}/digest?category=${category}`);

  if (!res.ok) {
    throw new Error('Failed to fetch digest');
  }

  return res.json();
}