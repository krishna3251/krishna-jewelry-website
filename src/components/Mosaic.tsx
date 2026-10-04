import { motion } from 'motion/react';

export default function Mosaic() {
  return (
    <section className="relative overflow-hidden bg-theme-light py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-5">
            <p className="section-kicker">The world around it</p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[.86]">
              Let the piece
              <em className="block italic shimmer-gold">set the tone.</em>
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-theme-dark/55">
              Jewellery changes the way a room, an outfit and even a photograph feels. This is the visual world Krishna is built to live in.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-7">
            <motion.figure
              className="sm:col-span-2 lg:col-span-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/images/Kundan%20Set%20with%20Saree.png"
                alt="Kundan set styled with a saree"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="mt-3 flex justify-between text-[9px] uppercase tracking-[.2em] text-theme-dark/35">
                <span>01 / Ceremony</span><span>Krishna</span>
              </figcaption>
            </motion.figure>

            <div className="grid gap-5 lg:col-span-3 lg:translate-y-20">
              <motion.figure
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.08 }}
              >
                <img
                  src="/images/Thewa%20Art%20Jewelry.png"
                  alt="Thewa art jewellery detail"
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="mt-3 flex justify-between text-[9px] uppercase tracking-[.2em] text-theme-dark/35">
                  <span>02 / Art</span><span>Thewa</span>
                </figcaption>
              </motion.figure>

              <motion.div
                className="border border-theme-dark/10 bg-[#f2ede3] p-7 sm:p-8"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.16 }}
              >
                <span className="text-4xl text-theme-accent/75">“</span>
                <p className="mt-2 font-serif text-2xl leading-[1.05]">
                  The right piece does not finish the look. It gives the look a reason to exist.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
