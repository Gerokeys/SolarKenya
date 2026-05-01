import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 50,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      trigger = el,
    } = options;

    const targets = stagger > 0 ? el.children : el;

    gsap.fromTo(
      targets,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return ref;
};

export default useScrollReveal;
