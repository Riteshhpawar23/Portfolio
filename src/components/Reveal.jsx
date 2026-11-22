import { useEffect, useRef } from 'react';

// Content is visible by default. Only what starts below the screen fades in, once.
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < innerHeight) return;

    el.dataset.reveal = 'pending';
    const show = () => {
      el.dataset.reveal = 'shown';
      observer.disconnect();
    };
    const observer = new IntersectionObserver(([entry]) => {
      // Also show it when a jump link or fast scroll has already passed it
      if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) show();
    }, { rootMargin: '0px 0px -5% 0px' });
    observer.observe(el);
    el.addEventListener('focusin', show);
    return () => {
      observer.disconnect();
      el.removeEventListener('focusin', show);
    };
  }, []);

  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>;
}
