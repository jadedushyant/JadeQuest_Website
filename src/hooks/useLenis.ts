import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { getLenis } from '../animations/core/lenis';

export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(() => getLenis());

  useEffect(() => {
    const instance = getLenis();
    setLenis(instance);
  }, []);

  return lenis;
}
