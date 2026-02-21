"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80",
    caption: "Advanced PCR & Molecular Analysis Systems",
  },
  {
    url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80",
    caption: "High-Precision Hematology Analyzers",
  },
  {
    url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80",
    caption: "Clinical Chemistry Diagnostic Platforms",
  },
  {
    url: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=900&q=80",
    caption: "Genomic Sequencing Technology",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number, dir: "next" | "prev" = "next") => {
    setPrev(current);
    setDirection(dir);
    setCurrent(idx);
  };

  const next = () => goTo((current + 1) % slides.length, "next");
  const back = () => goTo((current - 1 + slides.length) % slides.length, "prev");

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        setDirection("next");
        return (c + 1) % slides.length;
      });
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleArrow = (fn: () => void) => {
    fn();
    resetTimer();
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl shadow-blue-200">
      {/* slides */}
      {slides.map((slide, i) => {
        const isActive = i === current;
        const isPrev   = i === prev;

        let translateClass = "translate-x-full";
        if (isActive) translateClass = "translate-x-0";
        else if (isPrev) translateClass = direction === "next" ? "-translate-x-full" : "translate-x-full";

        return (
          <div
            key={i}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${translateClass}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.url}
              alt={slide.caption}
              className="h-full w-full object-cover"
            />
            {/* bottom gradient + caption */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-blue-950/80 to-transparent" />
            <p className="absolute bottom-12 left-5 right-16 text-sm font-medium text-white drop-shadow">
              {slide.caption}
            </p>
          </div>
        );
      })}

      {/* prev arrow */}
      <button
        onClick={() => handleArrow(back)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* next arrow */}
      <button
        onClick={() => handleArrow(next)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* dot indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i, i > current ? "next" : "prev"); resetTimer(); }}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* slide counter */}
      <span className="absolute right-4 bottom-[52px] z-10 text-xs font-semibold text-white/70">
        {current + 1} / {slides.length}
      </span>
    </div>
  );
}
