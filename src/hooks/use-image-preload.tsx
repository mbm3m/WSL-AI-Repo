
import { useState, useEffect } from 'react';

/**
 * Custom hook for preloading images
 * 
 * @param src - Image source URL to preload
 * @param priority - Loading priority ('high', 'medium', 'low')
 * @returns Object containing loading state and error
 */
export function useImagePreload(src: string, priority: 'high' | 'medium' | 'low' = 'medium') {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Skip preloading for low priority images
    if (priority === 'low') return;
    
    const img = new Image();
    
    const handleLoad = () => {
      setLoaded(true);
    };
    
    const handleError = (e: ErrorEvent) => {
      setError(new Error(`Failed to load image: ${e.message}`));
    };
    
    // Set priority attribute if browser supports it
    if ('fetchPriority' in img) {
      img.fetchPriority = priority;
    }
    
    img.onload = handleLoad;
    img.onerror = handleError as any;
    
    // Set source to start loading
    img.src = src;
    
    // If the image is in cache, onload might not fire
    if (img.complete) {
      setLoaded(true);
    }
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, priority]);
  
  return { loaded, error };
}

/**
 * Preload multiple images with priorities
 * 
 * @param images - Array of { src, priority } objects
 */
export function preloadImages(images: Array<{ src: string, priority: 'high' | 'medium' | 'low' }>) {
  images.sort((a, b) => {
    const priorityValue = { high: 0, medium: 1, low: 2 };
    return priorityValue[a.priority] - priorityValue[b.priority];
  }).forEach(({ src, priority }) => {
    const img = new Image();
    if ('fetchPriority' in img) {
      img.fetchPriority = priority;
    }
    img.src = src;
  });
}

export default useImagePreload;
