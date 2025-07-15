import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState, useRef } from "react";

import { Bubble } from "./Bubble";

interface CaretProps {
  bubbleState: "hidden" | "icon" | "suggesting";
}

export function Caret({ bubbleState }: CaretProps) {
  const controls = useAnimationControls();
  const [internalState, setInternalState] = useState<
    "hidden" | "icon" | "suggesting"
  >(bubbleState);
  const isTransitioning = useRef(false);

  const isBlinking = internalState === "hidden";

  // Handle state transitions with intermediate steps
  useEffect(() => {
    if (bubbleState === internalState || isTransitioning.current) {
      return;
    }

    const needsIntermediateTransition =
      (internalState === "hidden" && bubbleState === "suggesting") ||
      (internalState === "suggesting" && bubbleState === "hidden");

    if (needsIntermediateTransition) {
      isTransitioning.current = true;
      setInternalState("icon");
    } else {
      setInternalState(bubbleState);
    }
  }, [bubbleState, internalState]);

  const handleAnimationComplete = () => {
    if (isTransitioning.current) {
      // Complete the transition to the target state
      setInternalState(bubbleState);
      isTransitioning.current = false;
    }
  };

  useEffect(() => {
    const animateBlinking = async () => {
      while (isBlinking && !isTransitioning.current) {
        await controls.start({
          opacity: 0,
          transition: {
            duration: 0.5,
            ease: [0.455, 0.03, 0.515, 0.955], // ease-in-out-quad
          },
        });
        if (!isBlinking || isTransitioning.current) break;
        await controls.start({
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: [0.455, 0.03, 0.515, 0.955], // ease-in-out-quad
          },
        });
      }
    };

    if (isBlinking) {
      animateBlinking();
    } else {
      controls.start({
        opacity: 1,
        transition: {
          duration: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quad
        },
      });
    }
  }, [isBlinking, controls]);

  return (
    <>
      <div className="flex flex-col items-start">
        <Bubble
          state={internalState}
          onAnimationComplete={handleAnimationComplete}
        />

        <motion.div
          className="w-1 h-14 bg-stone-900 rounded-full"
          style={{
            margin: "0 auto 0 0",
            boxShadow: "0 0 2px 0 rgba(0,0,0,0.15)",
          }}
          animate={controls}
          initial={{ opacity: 1 }}
          aria-label="Text caret"
          role="presentation"
        />
      </div>
    </>
  );
}
