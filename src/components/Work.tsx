import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Work() {
  return (
    <div className="min-h-[100dvh] w-full bg-[#1C1512] text-[#FEFEFD] p-6 sm:p-12 flex flex-col justify-center relative overflow-hidden py-24 sm:py-32">
      
      {/* Decorative lines */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-[#B69269]/20 hidden sm:block" />
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-[#B69269]/20 hidden sm:block" />

      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#B69269] mb-4">
              Selected Works
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-light tracking-tighter">
              Featured <span className="text-[#B69269] italic">Projects</span>
            </h2>
          </div>
          <a href="#" className="font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:text-[#A35A3A] transition-colors group relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:bg-[#A35A3A] after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out">
            View all work <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="group cursor-pointer relative"
        >
          <div className="aspect-[16/9] w-full bg-[#1C1512] overflow-hidden relative rounded-2xl border border-[#B69269]/10">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              alt="GZNA Project" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1512] via-[#1C1512]/20 to-transparent opacity-90" />
            
            {/* Abstract data visualization overlay */}
            <div className="absolute inset-0 opacity-30 mix-blend-screen transition-opacity duration-700 group-hover:opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
            
            <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div className="overflow-hidden">
                <h3 className="big-text-style group-hover:italic transition-all duration-500 origin-left">GZNA</h3>
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-left sm:text-right text-[#FEFEFD]/80">
                <p>The World's biggest</p>
                <p>Vinyl manufacturer</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 font-mono text-xs uppercase tracking-widest text-[#B69269]">
          {[
            {
              title: "Hand-crafted digital design Refuge",
              desc: "We build digital experiences that stand out from the generic web."
            },
            {
              title: "Gold idEAs seekers",
              desc: "Constantly exploring new territories in design and technology."
            },
            {
              title: "Republic of collaborative minds",
              desc: "A collective of designers, developers, and strategists."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col gap-6 relative"
            >
              <div className="h-[1px] w-full bg-[#B69269]/20" />
              <h4 className="text-[#FEFEFD] text-sm tracking-widest leading-relaxed">{item.title}</h4>
              <p className="text-[#FEFEFD]/50 leading-relaxed normal-case tracking-normal text-sm font-sans font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-32 sm:mt-48 pt-16 sm:pt-24 border-t border-[#B69269]/20 flex flex-col items-center text-center"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-[#B69269] mb-8">
            Next Steps
          </div>
          <h2 className="big-text-style mb-12 hover:italic transition-all duration-500 cursor-pointer">
            Let's Talk
          </h2>
          <a href="/connect" className="group flex items-center gap-4 border border-[#B69269]/30 rounded-full px-8 py-4 hover:bg-[#B69269] hover:text-[#1C1512] transition-all duration-300">
            <span className="font-mono text-xs uppercase tracking-widest">Start a project</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
