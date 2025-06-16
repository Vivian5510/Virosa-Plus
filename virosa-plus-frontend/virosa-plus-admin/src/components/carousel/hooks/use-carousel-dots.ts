import type { EmblaCarouselType } from 'embla-carousel';

import { useState, useEffect, useCallback } from 'react';

import type { UseCarouselDotsReturn } from '../types';

// ----------------------------------------------------------------------

export function useCarouselDots(mainApi?: EmblaCarouselType): UseCarouselDotsReturn {
  const [dotCount, setDotCount] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onClickDot = useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi]
  );

  const onInit = useCallback((_mainApi: EmblaCarouselType) => {
    setScrollSnaps(_mainApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((_mainApi: EmblaCarouselType) => {
    setSelectedIndex(_mainApi.selectedScrollSnap());
    setDotCount(_mainApi.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!mainApi) return;

    onInit(mainApi);
    onSelect(mainApi);
    mainApi.on('reInit', onInit);
    mainApi.on('reInit', onSelect);
    mainApi.on('select', onSelect);
  }, [mainApi, onInit, onSelect]);

  return {
    dotCount,
    scrollSnaps,
    selectedIndex,
    onClickDot,
  };
}
