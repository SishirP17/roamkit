import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// A user-controlled text-size multiplier for the Survival Guide, so someone with
// weak eyesight can make the whole article bigger. Body font sizes are multiplied
// by `scale`. Persisted so the choice sticks across launches (offline, on-device).
// Mirrors the context + AsyncStorage pattern in src/lib/pro.js.

const STORAGE_KEY = 'survival.textScale.v1';

// The text-size steps the picker offers. 1 is the normal app size. Bigger jumps
// so the difference is obvious to someone who needs larger text.
export const SCALE_STEPS = [1, 1.25, 1.5];

const TextScaleContext = createContext({
  scale: 1,
  ready: false,
  setScale: () => {},
  increase: () => {},
  decrease: () => {},
  canIncrease: true,
  canDecrease: false,
});

export function TextScaleProvider({ children }) {
  const [scale, setScaleState] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const n = raw ? parseFloat(raw) : NaN;
        if (SCALE_STEPS.includes(n)) setScaleState(n);
      } catch (e) {}
      setReady(true);
    })();
  }, []);

  const persist = async (value) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, String(value));
    } catch (e) {}
  };

  const value = useMemo(() => {
    const setScale = (n) => {
      const next = SCALE_STEPS.includes(n) ? n : 1;
      setScaleState(next);
      persist(next);
    };
    const step = (dir) => {
      const i = SCALE_STEPS.indexOf(scale);
      const nextI = Math.min(
        SCALE_STEPS.length - 1,
        Math.max(0, (i < 0 ? 0 : i) + dir)
      );
      setScale(SCALE_STEPS[nextI]);
    };
    const i = SCALE_STEPS.indexOf(scale);
    return {
      scale,
      ready,
      setScale,
      increase: () => step(1),
      decrease: () => step(-1),
      canIncrease: i < SCALE_STEPS.length - 1,
      canDecrease: i > 0,
    };
  }, [scale, ready]);

  return (
    <TextScaleContext.Provider value={value}>
      {children}
    </TextScaleContext.Provider>
  );
}

export function useTextScale() {
  return useContext(TextScaleContext);
}
