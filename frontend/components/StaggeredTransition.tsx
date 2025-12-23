"use client";

import { motion } from "framer-motion";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function StaggeredTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}
