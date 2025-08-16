'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Review {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

function truncateText(text: string, sentenceCount = 3) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  return sentences.slice(0, sentenceCount).join(' ');
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        const allReviews = data.reviews || [];
        const fives = allReviews.filter((r: Review) => r.rating === 5);
        const randomized = fives.sort(() => Math.random() - 0.5).slice(0, 3);

        setReviews(randomized);
        setAverageRating(data.rating || null);
        setReviewCount(data.user_ratings_total || null);
      })
      .catch((err) => console.error('Failed to load reviews', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="flex text-5xl font-semibold mx-auto">Real Reviews from Google</h2>
            <p className="block text-center text-zinc-400">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!reviews.length) return null;

  return (
    <section className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4 text-center">
          <h2 className="mx-auto text-5xl sm:text-xl italic text-white text-center center font-semibold">5-Star Custom Deck Building in South Jersey</h2>
          <p className="mx-auto text-xl text-white text-center">Homeowners across South Jersey consistently rate our decks 5 stars for exceptional craftsmanship, quality materials, and unmatched service. See what they have to say in their own words.</p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-gray-900 rounded-lg p-6 mt-10 shadow-md border border-zinc-700 rounded-xl h-full flex flex-col justify-between animate-fade-in">
                <div className="mb-4 flex items-center">
                  {review.profile_photo_url ? (
                    <img
                      loading="lazy"
                      decoding="async"
                      src={`/api/profile-photo?url=${encodeURIComponent(review.profile_photo_url || '')}`}
                      alt={review.author_name}
                      className="w-10 h-10 rounded-full mr-3 object-cover border border-zinc-600"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {review.author_name[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{review.author_name}</p>
                    <p className="text-sm text-white">{review.relative_time_description}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <svg
                      key={starIdx}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.89 1.518 4.674c.3.921-.755 1.688-1.538 1.118L10 15.347l-3.976 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.915l1.518-4.674z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed">
                  {truncateText(review.text, 3)}
                </p>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev hidden md:block text-white" />
          <div className="swiper-button-next hidden md:block text-white" />
        </Swiper>
      </div>
    </section>
  );
}
