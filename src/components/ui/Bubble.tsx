import { motion } from "motion/react";
import type { Variants } from "motion/react";
import useMeasure from "react-use-measure";

interface BubbleProps {
  state: "hidden" | "icon" | "suggesting";
  onAnimationComplete?: () => void;
}

export function Bubble({ state, onAnimationComplete }: BubbleProps) {
  const [ref, bounds] = useMeasure();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.1,
      width: 38,
      height: 38,
      transformOrigin: "bottom",
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
    icon: {
      opacity: 1,
      scale: 1,
      width: 38,
      height: 38,
      transformOrigin: "bottom-center",
      transition: {
        duration: 0.3,
        ease: [0.215, 0.61, 0.355, 1], // ease-out-cubic
      },
    },
    suggesting: {
      opacity: 1,
      scale: 1,
      width: bounds.width || 38,
      height: 38,
      transformOrigin: "bottom-center",
      transition: {
        duration: 0.3,
        ease: [0.215, 0.61, 0.355, 1], // ease-out-cubic
      },
    },
  };

  return (
    <>
      <motion.div
        className="bg-stone-900 rounded-full ml-[-16px] -mb-1 flex items-center justify-start overflow-hidden"
        style={{
          boxShadow: "0 0 2px 0 rgba(0,0,0,0.15)",
        }}
        aria-label="Suggestion bubble"
        role="presentation"
        variants={variants}
        animate={state}
        onAnimationComplete={onAnimationComplete}
      >
        <div ref={ref} className="flex items-center justify-start">
          <div className="w-[30px] h-[30px] bg-stone-100 rounded-full ml-1" />

          <span
            className="text-stone-100 pl-1.5 pr-3 py-1 text-lg font-medium whitespace-nowrap"
            style={{
              opacity: state === "suggesting" ? 1 : 0,
            }}
          >
            Suggestion
          </span>
        </div>
      </motion.div>
    </>
  );
}
