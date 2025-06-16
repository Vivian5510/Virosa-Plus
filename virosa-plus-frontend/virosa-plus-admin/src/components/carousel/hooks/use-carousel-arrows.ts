import type { EmblaCarouselType } from 'embla-carousel';

import { useState, useEffect, useCallback } from 'react';

import type { UseCarouselArrowsReturn } from '../types';

// ----------------------------------------------------------------------

export const useCarouselArrows = (mainApi?: EmblaCarouselType): UseCarouselArrowsReturn => {
  const [disablePrev, setDisabledPrevBtn] = useState(true);

  const [disableNext, setDisabledNextBtn] = useState(true);

  const onClickPrev = useCallback(() => {
    if (!mainApi) return;
    mainApi.scrollPrev();
  }, [mainApi]);

  const onClickNext = useCallback(() => {
    if (!mainApi) return;
    mainApi.scrollNext();
  }, [mainApi]);

  const onSelect = useCallback((_mainApi: EmblaCarouselType) => {
    setDisabledPrevBtn(!_mainApi.canScrollPrev());
    setDisabledNextBtn(!_mainApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!mainApi) return;

    onSelect(mainApi);
    mainApi.on('reInit', onSelect);
    mainApi.on('select', onSelect);
  }, [mainApi, onSelect]);

  return {
    disablePrev,
    disableNext,
    onClickPrev,
    onClickNext,
  };
};
