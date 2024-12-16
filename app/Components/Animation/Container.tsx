"use client";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  reverse?: boolean;
}

const Container = ({ children, className, delay = 0.2, reverse }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: reverse ? -20 : 20 }}
      viewport={{ once: false }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Container;
