import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Google API returned ${res.status}`);
    }

    const data = await res.json();

    if (data.status !== 'OK') {
      return NextResponse.json({ error: `Google API error: ${data.status} - ${data.error_message || ''}` }, { status: 500 });
    }

    let reviews = data.result?.reviews || [];

    // Filter for only 5-star reviews
    reviews = reviews.filter((review) => review.rating === 5);

    // Randomize the array
    reviews = shuffleArray(reviews);

    // Trim to 3 reviews and 3 sentences
    reviews = reviews.slice(0, 3).map((review) => ({
      author_name: review.author_name,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      relative_time_description: review.relative_time_description,
      text: trimToSentences(review.text, 3),
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// Helper: Shuffle array randomly
function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Helper: Trim text to first `n` sentences
function trimToSentences(text: string, sentenceCount: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  return sentences.slice(0, sentenceCount).join(' ').trim();
}
