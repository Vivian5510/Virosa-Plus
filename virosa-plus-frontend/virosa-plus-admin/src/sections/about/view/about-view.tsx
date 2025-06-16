import { AboutHero } from '../about-hero';
import { AboutWhat } from '../about-what';
import { AboutTeam } from '../about-team';
import { AboutVision } from '../about-vision';
import { AboutTestimonials } from '../about-testimonials';

// ----------------------------------------------------------------------

export function AboutView() {
  return (
    <>
      <AboutHero />

      <AboutWhat />

      <AboutVision />

      <AboutTeam />

      <AboutTestimonials />
    </>
  );
}
