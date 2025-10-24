import { useEffect, useLayoutEffect } from 'react';

// On the server, React emits a warning when calling useLayoutEffect.
// This is because useLayoutEffect runs synchronously and may block page rendering.
// To avoid this, we can use useEffect during SSR, and useLayoutEffect after hydration.
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;