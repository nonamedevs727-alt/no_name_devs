import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = [
  { name: 'home', href: '/' },
  { name: 'about', href: '/about' },
  { name: 'services', href: '/services' },
  { name: 'connect', href: '/connect' },
];

const socials = [
  { name: 'instagram', href: '#' },
  { name: 'linkedin', href: '#' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Wordmark — top left */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-40 flex items-center gap-3 hover:opacity-60 transition-opacity duration-300"
      >
        <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
        <div className="flex flex-col leading-none">
          <span
            className="text-[1.45rem] font-bold uppercase tracking-[-0.03em] text-[#1f3324]"
            style={{ fontFamily: '"Social Gothic", "League Gothic", sans-serif' }}
          >
            NOname dev
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-[#4d6a51]/70 -mt-0.5">
            Studio
          </span>
        </div>
      </Link>

      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-40 p-2 text-[#1f3324] hover:scale-110 transition-transform duration-300 hover:opacity-60"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#1C1512] text-[#FEFEFD] flex flex-col p-8 sm:p-16"
          >
            <div className="flex justify-between items-start">
              <div className="text-xs uppercase tracking-widest font-mono">
                Freelance Build Team
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:rotate-90 transition-transform duration-500"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 w-full">
              {links.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="big-text-style hover:italic transition-all duration-300"
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 font-mono text-xs uppercase tracking-widest">
              <div className="flex flex-col gap-2">
                <span className="text-[#B69269]">Socials</span>
                <div className="flex gap-6">
                  {socials.map((social) => (
                    <a key={social.name} href={social.href} className="relative hover:text-[#A35A3A] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:bg-[#A35A3A] after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out">
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-right text-[#B69269]">
                © {new Date().getFullYear()} - Freelance Build Team
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
