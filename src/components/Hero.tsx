import Image from "next/image";
import { ArrowDown, Check } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <Image
        src="/deck-hero.png"
        alt="Custom backyard deck"
        fill
        priority
        className="object-cover object-center opacity-70"
      />

      <div className="absolute inset-0 bg-black/35 z-9" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          South Jersey's Premier Deck & Remodel Experts
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-white/90">
          Custom craftsmanship built to last. Outdoor living made beautiful.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base max-w-xl">
          {[
            "Licensed & Insured Experts",
            "Unmatched Craftsmanship",
            "Honest & Transparent Pricing",
            "100% Satisfaction Guarantee",
          ].map((text, index) => (
            <div key={index} className="flex items-center justify-center space-x-2">
              <Check className="text-green-500 font-black text-xl w-5 h-5" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <a
          href="#services"
          className="mt-8 inline-block bg-emerald-700 text-white px-6 py-3 rounded-full font-medium transition hover:bg-amber-400 hover:text-black"
        >
          View Our Work
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <ArrowDown className="w-6 h-6 animate-bounce text-white/80" />
      </div>
    </section>
  );
}
