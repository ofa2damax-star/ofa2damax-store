import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function LazyImage({ 
  src, 
  alt, 
  className, 
  placeholderClassName,
  aspectRatio = "square",
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)} style={{ aspectRatio: aspectRatio === "square" ? "1" : aspectRatio }}>
      {!isLoaded && (
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-secondary to-muted animate-pulse",
          placeholderClassName
        )} />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            error && "hidden"
          )}
          {...props}
        />
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
}