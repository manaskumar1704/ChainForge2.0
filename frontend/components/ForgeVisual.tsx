"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

type Spark = {
  x: number;
  y: number;
};

function generateSparks(count = 10): Spark[] {
  return Array.from({ length: count }).map(() => ({
    x: (Math.random() - 0.5) * 90,
    y: -Math.random() * 70,
  }));
}

export function ForgeVisual({ active }: { active: boolean }) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    if (!active) return;

    const id = setInterval(() => {
      setSparks(generateSparks());
    }, 900);

    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="relative w-full h-[320px] flex items-center justify-center">

      {/* Glow */}
      <div className="absolute bottom-8 w-80 h-40 bg-orange-500/25 blur-3xl animate-pulse" />

      {/* Hammer */}
      <motion.div
        className="absolute w-28 z-10 -top-1"
        animate={
          active
            ? { rotate: [-25, 0], y: [-20, 40] }
            : { rotate: 0, y: 0 }
        }
        transition={{
          duration: 0.45,
          ease: "easeInOut",
          repeat: active ? Infinity : 0,
          repeatDelay: 0.45,
        }}
      >
        <Image
          src="/hammer.png"
          alt="Hammer"
          width={112}
          height={112}
        />
      </motion.div>

      {/* Sparks */}
      <AnimatePresence>
        {active &&
          sparks.map((spark, i) => (
            <motion.span
              key={i}
              className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: spark.x,
                y: spark.y,
                opacity: 0,
              }}
              transition={{ duration: 0.45 }}
            />
          ))}
      </AnimatePresence>

      {/* Anvil */}
      <Image
        src="/anvil.png"
        alt="Anvil"
        width={176}
        height={88}
        className="mt-24 relative z-0"
      />
    </div>
  );
}
