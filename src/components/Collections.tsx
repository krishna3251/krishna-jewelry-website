import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { cn } from '../utils';

const collections = [
  { id:1, name:'Jadau Setting', subtitle:'Heritage', image:'/images/Jadau%20Setting.png', desc:'An expressive Jadau composition built around intricate detailing and a deeply Indian visual language.', details:['Handcrafted Jadau','22k Gold','Heritage technique'] },
  { id:2, name:'Kundan Polki', subtitle:'Bridal', image:'/images/Kundan%20Polki%20Set.png', desc:'Uncut brilliance and warm gold tones, designed for ceremonial dressing without looking overworked.', details:['Uncut stones','22k Yellow Gold','Bridal finish'] },
  { id:3, name:'The Borla', subtitle:'Signature', image:'/images/The%20Borla.png', desc:'A sculptural traditional ornament that gives the collection its unmistakable royal character.', details:['Traditional form','Precious stones','Statement piece'] },
  { id:4, name:'Thewa Art', subtitle:'Artisan', image:'/images/Thewa%20Art%20Jewelry.png', desc:'Gold and coloured glass come together in a craft tradition that feels closer to art than ornament.', details:['Thewa craft','Gold fused glass','Art-led design'] },
];

export default function Collections() {
  const [selected,setSelected]=useState<number|null>(null);
  const closeRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{ if(selected===null){document.body.style.overflow='';return;} document.body.style.overflow='hidden'; closeRef.current?.focus(); return()=>{document.body.style.overflow='';}; },[selected]);
  const active=collections.find(c=>c.id===selected);

  return (
    <section id="collections" className="relative bg-theme-light py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker">The collection</p>
            <h2 className="mt-4 font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[.92]">Pieces with <em className="italic shimmer-gold">presence.</em></h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-theme-dark/55">A focused edit of Indian jewellery traditions, presented with a quieter, contemporary point of view.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {collections.map((col,i)=>(
            <motion.button key={col.id} type="button" onClick={()=>setSelected(col.id)}
              className={cn('group relative overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-theme-accent',
                i===0?'md:col-span-7 aspect-[1.35/1]':i===1?'md:col-span-5 aspect-[.95/1]':'md:col-span-6 aspect-[1.08/1]')}
              initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.7,delay:i*.08}}>
              <img src={col.image} alt={col.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent"/>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="mb-2 flex items-center gap-3 text-[9px] uppercase tracking-[.28em] text-theme-accent"><span>{String(i+1).padStart(2,'0')}</span><span className="h-px w-8 bg-theme-accent/50"/><span>{col.subtitle}</span></div>
                <div className="flex items-end justify-between gap-5 text-white">
                  <h3 className="font-serif text-3xl sm:text-4xl">{col.name}</h3>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-all group-hover:border-theme-accent group-hover:text-theme-accent"><ArrowUpRight size={15}/></span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="collection-title">
          <motion.div className="relative grid max-h-[88vh] w-full max-w-5xl overflow-hidden bg-theme-light md:grid-cols-2" initial={{opacity:0,y:30,scale:.98}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.45}}>
            <button ref={closeRef} type="button" onClick={()=>setSelected(null)} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/85 backdrop-blur"><X size={17}/></button>
            <img src={active.image} alt={active.name} className="h-72 w-full object-cover md:h-full"/>
            <div className="overflow-y-auto p-8 sm:p-12 md:p-14">
              <p className="section-kicker">{active.subtitle}</p>
              <h3 id="collection-title" className="mt-4 font-serif text-4xl sm:text-5xl">{active.name}</h3>
              <p className="mt-6 text-base leading-7 text-theme-dark/60">{active.desc}</p>
              <div className="mt-9 border-y border-theme-dark/10 py-5">{active.details.map(detail=><div key={detail} className="flex items-center justify-between py-2 text-xs uppercase tracking-[.16em]"><span className="text-theme-dark/40">Detail</span><span>{detail}</span></div>)}</div>
              <a href="#contact" onClick={()=>setSelected(null)} className="mt-9 inline-flex items-center gap-2 rounded-full bg-theme-dark px-6 py-3 text-[10px] uppercase tracking-[.22em] text-theme-light">Enquire privately <ArrowUpRight size={14} className="text-theme-accent"/></a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
