import { motion } from "framer-motion";

export function BlobsBackground() {
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand/30 blur-3xl animate-blob" />
      <div
        className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-accent-glow/25 blur-3xl animate-blob"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute left-1/3 bottom-0 h-96 w-96 rounded-full bg-brand-2/25 blur-3xl animate-blob"
        style={{ animationDelay: "8s" }}
      />
    </div>
  );
}

export function FloatingParticles({ count = 15 }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[-1]">
      {items.map((_, i) => {
        const size = 4 + Math.random() * 10;
        const dur = 6 + Math.random() * 10;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gradient-brand opacity-30 blur-sm"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        );
      })}
    </div>
  );
}
