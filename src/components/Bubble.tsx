import { motion } from "motion/react";
import type { Variants } from "motion/react";
import useMeasure from "react-use-measure";
import { useEffect, useState } from "react";

interface BubbleProps {
  state: "hidden" | "icon" | "suggesting";
  onAnimationComplete?: () => void;
  zIndex?: number;
}

export function Bubble({ state, onAnimationComplete }: BubbleProps) {
  const [ref, bounds] = useMeasure();
  const [measureKey, setMeasureKey] = useState(0);

  // Check if we're on mobile (where scale-75 is applied)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (state === "suggesting") {
      setMeasureKey((prev) => prev + 1);
    }
  }, [state]);

  useEffect(() => {
    const handleResize = () => {
      if (state === "suggesting") {
        setMeasureKey((prev) => prev + 1);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [state]);

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
      width: bounds.width
        ? isMobile
          ? bounds.width / 0.75
          : bounds.width
        : 38,
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
        className="bg-stone-900 rounded-full -mb-1 flex items-center overflow-hidden relative ml-[-16px]"
        style={{
          boxShadow: "0 0 2px 0 rgba(0,0,0,0.15)",
        }}
        aria-label="Suggestion bubble"
        role="presentation"
        variants={variants}
        initial={false}
        animate={state}
        onAnimationComplete={onAnimationComplete}
      >
        <div
          className="w-[30px] h-[30px] bg-stone-100 rounded-full absolute left-1"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        <div
          ref={ref}
          key={`content-${measureKey}`}
          className="flex items-center justify-start"
          style={{
            opacity: state === "suggesting" ? 1 : 0,
          }}
        >
          <div className="w-[30px] h-[30px] flex-shrink-0" />
          <span className="text-stone-100 pl-2.5 pr-3.5 py-1 text-lg font-medium whitespace-nowrap">
            Suggestion
          </span>
        </div>
      </motion.div>
    </>
  );
}
