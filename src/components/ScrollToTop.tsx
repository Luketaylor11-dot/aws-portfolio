import { useLayoutEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Resets window scroll on client-side navigation (wouter does not do this by default).
 */
export default function ScrollToTop() {
  const [pathname] = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
