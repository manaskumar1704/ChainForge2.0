"use client";

import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { StaggeredTransition } from "./StaggeredTransition";

const variants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      layout
    >
      <StaggeredTransition>{children}</StaggeredTransition>
    </motion.div>
  );
}
