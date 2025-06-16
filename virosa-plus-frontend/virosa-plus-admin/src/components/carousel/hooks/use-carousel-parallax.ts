import type { EmblaEventType, EmblaCarouselType } from 'embla-carousel';

import { useRef, useEffect, useCallback } from 'react';

import { carouselClasses } from '../classes';

import type { CarouselOptions } from '../types';

// ----------------------------------------------------------------------

export function useParallax(mainApi?: EmblaCarouselType, parallax?: CarouselOptions['parallax']) {
  const tweenFactor = useRef(0);

  const tweenNodes = useRef<HTMLElement[]>([]);

  const TWEEN_FACTOR_BASE = typeof parallax === 'number' ? parallax : 0.24;

  const setTweenNodes = useCallback((_mainApi: EmblaCarouselType): void => {
    tweenNodes.current = _mainApi
      .slideNodes()
      .map(
        (slideNode) => slideNode.querySelector(`.${carouselClasses.slide.parallax}`) as HTMLElement
      );
  }, []);

  const setTweenFactor = useCallback(
    (_mainApi: EmblaCarouselType) => {
      tweenFactor.current = TWEEN_FACTOR_BASE * _mainApi.scrollSnapList().length;
    },
    [TWEEN_FACTOR_BASE]
  );

  const tweenParallax = useCallback((_mainApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = _mainApi.internalEngine();

    const scrollProgress = _mainApi.scrollProgress();

    const slidesInView = _mainApi.slidesInView();

    const isScrollEvent = eventName === 'scroll';

    _mainApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;

      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const translateValue = diffToTarget * (-1 * tweenFactor.current) * 100;

        const tweenNode = tweenNodes.current[slideIndex];

        if (tweenNode) {
          tweenNode.style.transform = `translateX(${translateValue}%)`;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!mainApi || !parallax) return;

    setTweenNodes(mainApi);
    setTweenFactor(mainApi);
    tweenParallax(mainApi);

    mainApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainApi, tweenParallax]);

  return null;
}
