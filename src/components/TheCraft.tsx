import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { GoldFloaters } from './GoldDecorations';

const craftSteps = [
  {
    label: "The Design",
    title: "Vision",
    desc: "Inspired by ancient motifs and modern minimalism, our designs bridge the gap between eras.",
    icon: "✦",
  },
  {
    label: "The Materials",
    title: "Purity",
    desc: "We source only conflict-free diamonds and 18k recycled gold, ensuring every piece respects the earth.",
    icon: "◈",
  },
  {
    label: "The Process",
    title: "Precision",
    desc: "Every facet is cut by master artisans, catching light like a glacier at dawn. A tactile landscape of brilliance.",
    icon: "❖",
  },
  {
    label: "The Result",
    title: "Eternity",
    desc: "A piece that transcends time. Not just jewelry, but an heirloom crafted to be passed down through generations.",
    icon: "✧",
  },
];

export default function TheCraft()
{
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="craft" ref={containerRef} className="relative min-h-screen bg-theme-dark text-theme-light overflow-hidden py-32">
      {/* Background Parallax Image */}
      <div className="absolute inset-0 z-0 opacity-30">
        <motion.div className="w-full h-[140%]" style={{ y }}>
          <img
            src="/images/Kundan%20Set%20with%20Saree.png"
            alt="Jewelry making process"
            className="w-full h-full object-cover sepia-[.3] hue-rotate-15"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-theme-dark via-theme-dark/50 to-theme-dark" />
      </div>

      <GoldFloaters variant="dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-24">
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-[1px] w-12 bg-theme-accent/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-theme-accent font-medium">Our Process</span>
          </motion.div>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight">
            {"The craft is our".split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.em
              className="italic shimmer-gold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              tribute
            </motion.em>
            {" "}
            {"to the source.".split(' ').map((word, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {craftSteps.map((item, i) => (
            <motion.div
              key={i}
              className="group relative flex flex-col gap-5 p-6 rounded-xl glass-card-dark card-shine border border-white/5 hover:border-theme-accent/30 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
            >
              {/* Step number */}
              <div className="flex items-center justify-between">
                <motion.span
                  className="text-3xl text-theme-accent/60 group-hover:text-theme-accent transition-colors duration-300"
                  initial={{ opacity: 0.4 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {item.icon}
                </motion.span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-mono">
                  0{i + 1}
                </span>
              </div>

              {/* Accent line */}
              <div className="h-[1px] w-full bg-gradient-to-r from-theme-accent/30 via-theme-accent/10 to-transparent group-hover:from-theme-accent/60 transition-all duration-500" />

              <motion.span
                className="uppercase tracking-[0.25em] text-[10px] text-theme-accent"
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {item.label}
              </motion.span>

              <h3 className="font-serif text-2xl md:text-3xl group-hover:text-theme-accent transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-sm text-theme-light/50 leading-relaxed group-hover:text-theme-light/70 transition-colors duration-300">
                {item.desc}
              </p>

              {/* Bottom glow on hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-theme-accent/0 to-transparent group-hover:via-theme-accent/40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
