"use client";

import { useEffect, useRef, useState } from "react";

/** Image with a reserved aspect-ratio and a shimmer skeleton until it has decoded. */
export function Photo({
  src,
  alt,
  w = 1408,
  h = 768,
  className = "",
  position = "50% 50%",
  priority = false,
  srcMobile,
}: {
  src: string;
  alt: string;
  w?: number;
  h?: number;
  className?: string;
  position?: string;
  priority?: boolean;
  srcMobile?: string;
}) {
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the image may already be cached before hydration
    if (el && el.complete && el.naturalWidth > 0) setDone(true);
  }, []);

  return (
    <div className={`skel relative overflow-hidden ${className}`} aria-busy={!done}>
      <picture>
        {srcMobile ? <source media="(max-width: 700px)" srcSet={srcMobile} /> : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={ref}
          src={src}
          alt={alt}
          width={w}
          height={h}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setDone(true)}
          onError={() => setDone(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ objectPosition: position, opacity: done ? 1 : 0 }}
        />
      </picture>
    </div>
  );
}
