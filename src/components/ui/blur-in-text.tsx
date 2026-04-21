"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface BlurInTextProps {
  text: string;
  blurAmount?: number;
  duration?: number;
  stagger?: number;
  split?: "letter" | "word";
  trigger?: "mount" | "inView";
  className?: string;
}

export function BlurInText({
  text,
  blurAmount = 12,
  duration = 1,
  stagger = 0.08,
  split = "letter",
  trigger = "mount",
  className,
}: BlurInTextProps) {
  if (!text) return null;
  const items = split === "letter" ? text.split("") : text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, filter: `blur(${blurAmount}px)` },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration }
    },
  };

  const animationProps = trigger === "inView" 
    ? { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-10%" } }
    : { initial: "hidden", animate: "visible" };

  return (
    <motion.span
      className={clsx("inline-flex flex-wrap", className)}
      variants={containerVariants}
      {...animationProps}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {item}{split === "word" && index < items.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
