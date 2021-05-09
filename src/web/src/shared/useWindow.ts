import { useState, useEffect } from 'react';

interface windowProps {
  width: number | undefined;
  height: number | undefined;
}

/** Returns width and height (in px) object */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<windowProps>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
