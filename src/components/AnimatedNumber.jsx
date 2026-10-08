import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

export function AnimatedNumber({ value, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(reduceMotion ? value : 0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      duration: 1.1,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [value, delay, reduceMotion, count]);

  return <motion.span aria-hidden="true">{rounded}</motion.span>;
}