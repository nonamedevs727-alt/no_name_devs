'use client'

import { SplineScene } from "@/src/components/ui/splite";
import { Spotlight } from "@/src/components/ui/spotlight"
import { motion } from "framer-motion";
 
export function SplineSceneBasic() {
  return (
    <section className="w-full min-h-[100dvh] bg-[#1C1512] relative overflow-hidden flex items-center py-16 sm:py-24">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#FF73A4"
      />
      
      {/* Decorative lines */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-[#B69269]/20 hidden sm:block" />
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-[#B69269]/20 hidden sm:block" />

      <div className="flex flex-col lg:flex-row h-full max-w-7xl mx-auto w-full px-6 sm:px-12 z-10 gap-12">
        {/* Left content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 relative z-10 flex flex-col justify-center"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-[#B69269] mb-8">
            Digital Dimensions
          </div>
          <h2 className="big-text-style mb-6">
            Beyond <br/> Flat Design
          </h2>
          <p className="text-[#FEFEFD]/70 max-w-lg font-light text-lg sm:text-xl leading-relaxed">
            We craft immersive 3D experiences that elevate your brand narrative. 
            By blending spatial design with interactive web technologies, we create 
            environments that captivate and engage.
          </p>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="h-[1px] w-12 bg-[#B69269]/50" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#B69269]">
              Explore the void
            </span>
          </div>
        </motion.div>

        {/* Right content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 relative min-h-[350px] sm:min-h-[500px] lg:min-h-full rounded-2xl overflow-hidden border border-[#B69269]/10 bg-[#1C1512]/50 backdrop-blur-sm"
        >
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full absolute inset-0"
          />
        </motion.div>
      </div>
    </section>
  )
}
