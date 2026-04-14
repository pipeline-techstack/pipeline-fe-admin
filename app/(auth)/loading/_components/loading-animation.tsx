import { motion, AnimatePresence } from "framer-motion";
import logoIcon from "@/assets/logo.png";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const word = "Pipeline";
  const letters = word.split("");

  const [showSlowMessage, setShowSlowMessage] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      setShowSlowMessage(false); // reset when loading starts
      timer = setTimeout(() => {
        setShowSlowMessage(true);
      }, 10 * 1000); // 30 seconds
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="z-50 fixed inset-0 flex flex-col justify-center items-center bg-background-loading bg-white overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Dashed grid background */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
      linear-gradient(to right, #e9e9ee 1px, transparent 1px),
      linear-gradient(to bottom, #e9e9ee 1px, transparent 1px)
    `,
              backgroundSize: "120px 120px",
              backgroundRepeat: "repeat",
            }}
          />
          {/* Secondary smaller grid */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `
      linear-gradient(to right, #f2f2f6 1px, transparent 1px),
      linear-gradient(to bottom, #f2f2f6 1px, transparent 1px)
    `,
              backgroundSize: "24px 24px",
              backgroundRepeat: "repeat",
            }}
          />

          {/* Subtle background glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
      radial-gradient(
        ellipse 60% 80% at 50% 50%,
        rgba(124, 92, 255, 0.15) 0%,
        rgba(124, 92, 255, 0.08) 30%,
        rgba(124, 92, 255, 0.03) 55%,
        transparent 75%
      )
    `,
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo + Letter-by-letter text */}
          <div className="z-10 relative flex items-center gap-4 select-none">
            {/* Rotating logo icon */}
            <motion.img
              src={logoIcon.src}
              alt="Pipeline icon"
              className="rounded-xl w-16 h-16"
              // initial={{ opacity: 0, scale: 0.8 }}
              // animate={{
              //   opacity: 1,
              //   scale: 1,
              //   rotateY: 180,
              // }}
              // transition={{
              //   opacity: { duration: 0.5, ease: "easeOut" },
              //   scale: { duration: 0.5, ease: "easeOut" },
              //   rotateY: {
              //     duration: 3,
              //     ease: "linear",
              //     repeat: 1,
              //   },
              // }}
            />

            {/* Letters */}
            {/* Letters - GenZ Chatpata Mode */}
            <motion.div
              className="relative flex items-center gap-0 font-semibold text-5xl tracking-wide"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block relative"
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 40,
                      scale: 0.6,
                      rotate: -8,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotate: 0,
                    },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 18,
                    mass: 0.6,
                  }}
                >
                  {/* Gradient animated text */}
                  <motion.span
                    className="bg-[length:200%_200%] bg-clip-text text-gray-600"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {letter}
                  </motion.span>

                  {/* Glow burst on appear */}
                  <motion.span
                    className="absolute inset-0 blur-xl rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + i * 0.08,
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(196,181,253,0.6), rgba(244,114,182,0.5), rgba(199,210,254,0.6))",
                      filter: "blur(24px)",
                    }}
                  />
                </motion.span>
              ))}

              {/* Shimmer sweep across whole word */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{
                  delay: 0.6,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                  filter: "blur(8px)",
                }}
              />
            </motion.div>
          </div>
          <AnimatePresence>
            {showSlowMessage && (
              <motion.p
                className="mt-4 text-gray-500 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                Things are taking a little longer than usual. Thank you for your
                patience.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
