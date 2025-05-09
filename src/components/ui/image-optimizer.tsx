
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: "high" | "medium" | "low";
  onLoad?: () => void;
  placeholderColor?: string;
}

/**
 * ImageOptimizer - A component for optimized image loading
 * 
 * Features:
 * - Lazy loading by default, eager loading for high priority images
 * - Proper width and height attributes to prevent layout shift
 * - Loading placeholder
 * - Progressive loading with blur-up effect
 */
export function ImageOptimizer({
  src,
  alt,
  width,
  height,
  className,
  priority = "low",
  onLoad,
  placeholderColor = "bg-gray-100 dark:bg-gray-800",
}: ImageOptimizerProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  useEffect(() => {
    // Preload high priority images
    if (priority === "high") {
      const img = new Image();
      img.src = src;
    }
  }, [src, priority]);

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}>
      {/* Placeholder */}
      {!loaded && (
        <div 
          className={cn(
            "absolute inset-0 animate-pulse rounded",
            placeholderColor
          )}
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
          aria-hidden="true"
        />
      )}
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        loading={priority === "high" ? "eager" : "lazy"}
        fetchpriority={priority}
        onLoad={handleLoad}
      />
    </div>
  );
}

export default ImageOptimizer;
