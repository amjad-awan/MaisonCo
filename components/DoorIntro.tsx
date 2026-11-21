
"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function DoorIntro({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = setTimeout(() => {
      setOpened(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  const doorTransition = {
    duration: 2.8,
    ease: [0.65, 0, 0.35, 1] as [number, number, number, number],
  };

  return (
    <>
      {children}

      <div
        className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
        style={{ perspective: "2200px" }}
        aria-hidden="true"
      >
        {/* LEFT DOOR */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: opened ? 118 : 0 }}
          transition={doorTransition}
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            background:
              "linear-gradient(90deg, #21140e 0%, #503020 35%, #382218 75%, #24160f 100%)",
            boxShadow: opened
              ? "inset -20px 0 45px rgba(0,0,0,.5)"
              : "inset -15px 0 35px rgba(0,0,0,.4)",
          }}
        >
          <DoorPanel side="left" />
        </motion.div>

        {/* RIGHT DOOR */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: opened ? -118 : 0 }}
          transition={doorTransition}
          style={{
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            background:
              "linear-gradient(270deg, #21140e 0%, #503020 35%, #382218 75%, #24160f 100%)",
            boxShadow: "inset 15px 0 35px rgba(0,0,0,.4)",
          }}
        >
          <DoorPanel side="right" />
        </motion.div>
      </div>
    </>
  );
}

function DoorPanel({ side }: { side: "left" | "right" }) {
  return (
    <>
      {/* Wood texture */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0px, rgba(210,170,120,.12) 2px, transparent 5px, transparent 22px)",
        }}
      />

      {/* Decorative frame */}
      <div className="absolute inset-3 border border-[#b49a70]/60 md:inset-7">
        <div className="absolute inset-2 border border-[#b49a70]/25 md:inset-4" />

        {/* Upper panel */}
        <div className="absolute inset-x-[10%] top-[9%] h-[35%] border border-[#b49a70]/45">
          <div className="absolute inset-2 border border-[#b49a70]/20 md:inset-4" />
        </div>

        {/* Lower panel */}
        <div className="absolute inset-x-[10%] bottom-[9%] h-[35%] border border-[#b49a70]/45">
          <div className="absolute inset-2 border border-[#b49a70]/20 md:inset-4" />
        </div>
      </div>

      {/* Branding */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="mb-4 h-px w-8 bg-[#c4a779] md:w-12" />

        <p className="whitespace-nowrap font-serif text-2xl tracking-[0.12em] text-[#e8d5b5] sm:text-4xl md:text-6xl">
          {side === "left" ? "MAISON" : "& CO."}
        </p>

        <div className="mt-5 h-px w-8 bg-[#c4a779] md:w-12" />
      </div>

      {/* Brass handles */}
      <div
        className={`absolute top-1/2 flex -translate-y-1/2 items-center ${
          side === "left" ? "right-[5%]" : "left-[5%]"
        }`}
      >
        <div className="h-12 w-3 rounded-full border border-[#e0bd80] bg-gradient-to-r from-[#785329] via-[#e0bd80] to-[#79532d] shadow-[0_0_20px_rgba(212,175,110,.3)] md:h-16 md:w-4" />
      </div>

      {/* Bottom detail */}
      <div className="absolute bottom-7 left-0 right-0 text-center">
        <p className="text-[7px] tracking-[0.2em] text-[#c4a779]/70 md:text-[9px] md:tracking-[0.35em]">
          {side === "left" ? "EXCEPTIONAL" : "LIVING"}
        </p>
      </div>
    </>
  );
}
