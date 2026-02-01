import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingSharks() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Only set dimensions client-side
  useEffect(() => {
    const update = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update(); // initial
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Don't render bubbles until we have client dimensions
  if (dimensions.width === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(6)].map((_, i) => {
        const size = 20 + Math.random() * 100;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 10;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/10 blur-sm" // added blur for softness
            initial={{ 
              x: Math.random() * dimensions.width, 
              y: dimensions.height + 100 
            }}
            animate={{ 
              y: -100,
              x: Math.random() * dimensions.width   // random horizontal drift
            }}
            transition={{ 
              duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay,
            }}
            style={{
              width: size,
              height: size,
              // Optional: slight color variation
              backgroundColor: `rgba(59, 130, 246, ${0.05 + Math.random() * 0.1})`,
            }}
          />
        );
      })}
    </div>
  );
}