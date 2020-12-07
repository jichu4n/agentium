import {useRef, useEffect} from 'react';

/** Hook for getting the previous value of a prop or state. */
function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
