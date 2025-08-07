'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-stone-200 text-lg px-4 py-5 flex items-center justify-between">
      <p className="text-center w-full font-bold italic">
        🚨 We're booking projects for Fall 2025 — <Link href="/contact" className="hover:underline">Get your free estimate today!</Link>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="text-stone-200 hover:text-yellow-500 cursor-pointer ml-4 text-3xl font-bold"
        aria-label="Close announcement"
      >
        &times;
      </button>
    </div>
  );
}

