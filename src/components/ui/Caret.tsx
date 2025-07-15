import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";

import { Bubble } from "./Bubble";

interface CaretProps {
  bubbleState: "hidden" | "icon" | "suggesting";
}

export function Caret({ bubbleState }: CaretProps) {
  const controls = useAnimationControls();
  const isBlinking = bubbleState === "hidden";

  useEffect(() => {
    const animateBlinking = async () => {
      while (isBlinking) {
        await controls.start({
          opacity: 0,
          transition: {
            duration: 0.5,
            ease: [0.455, 0.03, 0.515, 0.955], // ease-in-out-quad
          },
        });
        if (!isBlinking) break;
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
        <Bubble state={bubbleState} />

        <motion.div
          className="w-1 h-14 bg-black rounded-full"
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
