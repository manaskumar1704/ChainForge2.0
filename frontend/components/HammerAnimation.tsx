"use client";

import { motion } from "framer-motion";

export function HammerAnimation({ active }: { active: boolean }) {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Anvil */}
      <div className="w-32 h-12 bg-gray-700 rounded-md absolute bottom-12" />

      {/* Hammer */}
      <motion.div
        className="w-24 h-6 bg-gray-900 rounded absolute origin-bottom-right"
        animate={active ? { rotate: [-30, 20, -30] } : { rotate: -30 }}
        transition={
          active
            ? { repeat: Infinity, duration: 0.6, ease: "easeInOut" }
            : {}
        }
        style={{ top: "40px", right: "60px" }}
      />
    </div>
  );
}
