"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface AnimatedHeroTitleProps {
  title: string;
  className?: string;
}

/**
 * Normalizes the tagline/hero title:
 * - Strips all '#' symbols.
 * - Replaces any unspaced concatenated variant (e.g. #PureTropicalAquaticPlantsfromtheHeartofCeylon)
 *   with proper spaced words: "Pure Tropical Aquatic Plants from the Heart of Ceylon".
 * - Corrects CamelCase / unspaced run-together words.
 * - Guarantees single standard spaces between all words.
 */
function normalizeTagline(raw: string): string {
  if (!raw) return "Pure Tropical Aquatic Plants from the Heart of Ceylon";

  // Remove all hash symbols
  let cleaned = raw.replace(/#/g, "").trim();

  // Check if it matches the specific unspaced string (case-insensitive)
  const lettersOnly = cleaned.toLowerCase().replace(/[^a-z]/g, "");
  if (lettersOnly === "puretropicalaquaticplantsfromtheheartofceylon") {
    return "Pure Tropical Aquatic Plants from the Heart of Ceylon";
  }

  // If there are no spaces in the string, split PascalCase / CamelCase words
  if (!cleaned.includes(" ") && cleaned.length > 0) {
    cleaned = cleaned
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/fromthe/gi, "from the")
      .replace(/ofthe/gi, "of the")
      .replace(/heartof/gi, "Heart of")
      .trim();
  }

  // Collapse multiple whitespace
  cleaned = cleaned.replace(/\s+/g, " ");

  return cleaned || "Pure Tropical Aquatic Plants from the Heart of Ceylon";
}

export default function AnimatedHeroTitle({
  title,
  className = "",
}: AnimatedHeroTitleProps) {
  const prefersReducedMotion = useReducedMotion();
  const normalizedTitle = normalizeTagline(title);
  const words = normalizedTitle.split(" ").filter(Boolean);

  // Fallback for reduced motion or empty states
  if (prefersReducedMotion || words.length === 0) {
    return (
      <h1 className={`${className} break-words whitespace-normal`}>
        {words.map((word, idx) => {
          const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
          const isHighlight = cleanWord === "ceylon";
          return (
            <React.Fragment key={`${word}-${idx}`}>
              <span
                className={`inline-block whitespace-nowrap ${
                  isHighlight ? "text-[#0B7A0B]" : "text-[#0A2D5B]"
                }`}
              >
                {word}
              </span>
              {idx < words.length - 1 && " "}
            </React.Fragment>
          );
        })}
      </h1>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: 16,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${className} break-words whitespace-normal`}
    >
      {words.map((word, idx) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
        const isHighlight = cleanWord === "ceylon";

        return (
          <React.Fragment key={`${word}-${idx}`}>
            <motion.span
              variants={wordVariants}
              className={`inline-block whitespace-nowrap ${
                isHighlight ? "text-[#0B7A0B]" : "text-[#0A2D5B]"
              }`}
            >
              {word}
            </motion.span>
            {idx < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </motion.h1>
  );
}
