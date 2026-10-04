import { CalendarDays, Gem, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const notes = [
  { icon: Gem, title: 'See it properly', copy: 'Take your time with the proportions, details and finish before you decide.' },
  { icon: Sparkles, title: 'Style it your way', copy: 'Build a look around one statement piece or layer a quieter story.' },
  { icon: CalendarDays, title: 'Make it personal', copy: 'For special pieces, use a private appointment to discuss the right direction.' },
];

export default function AtelierNote() {
  return (
    <section className="border-y border-theme-dark/10 bg-[#f3eee4]">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-3">
        {notes.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={item.title}
              className="group border-b border-theme-dark/10 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-10 lg:p-12"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <div className="flex items-start justify-between">
                <Icon size={20} strokeWidth={1.4} className="text-theme-accent transition-transform duration-500 group-hover:-translate-y-1" />
                <span className="font-mono text-[9px] tracking-[.18em] text-theme-dark/25">0{index + 1}</span>
              </div>
              <h3 className="mt-10 font-serif text-3xl">{item.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-theme-dark/52">{item.copy}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
