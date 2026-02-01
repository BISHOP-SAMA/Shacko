import { RegistrationForm } from "@/components/RegistrationForm";
import { GalleryGrid } from "@/components/GalleryGrid";
import { FloatingSharks } from "@/components/FloatingSharks";
import { motion } from "framer-motion";
import { ComicButton } from "@/components/ui/comic-button";
import { SiX, SiDiscord } from "react-icons/si";

export default function Home() {
  const scrollToForm = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0ea5e9] via-[#38bdf8] to-[#7dd3fc] selection:bg-[#ec4899] selection:text-white overflow-x-hidden">
      <FloatingSharks />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0ea5e9]/90 backdrop-blur-md border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/shark-logo.png"
              alt="Shacko Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="text-3xl font-[Bangers] text-white text-stroke tracking-widest">
              SHACKO
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/Sharksonbase_"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full border-2 border-black comic-shadow-sm hover:scale-110 transition-transform"
              data-testid="link-twitter"
            >
              <SiX className="w-5 h-5" />
            </a>
            <a
              href="https://discord.gg/dfxMGDTnpM"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full border-2 border-black comic-shadow-sm hover:scale-110 transition-transform"
              data-testid="link-discord"
            >
              <SiDiscord className="w-5 h-5 text-[#5865F2]" />
            </a>
            <ComicButton size="sm" variant="accent" onClick={scrollToForm}>
              Whitelist Now
            </ComicButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-8 px-6 min-h-screen flex flex-col items-center justify-center">
        {/* Big Bold Text */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center z-10 mb-4"
        >
          <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-[Bangers] text-white leading-[0.85] tracking-tight">
            <span className="block text-stroke">CHOMP.</span>
            <span className="block text-stroke">COLLECT.</span>
            <span className="block text-[#1e3a5f] text-stroke">SHACKO.</span>
          </h1>
        </motion.div>

        {/* Hero Shark Image */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 w-full max-w-4xl mx-auto"
        >
          <img
            src="/images/hero-shark.png"
            alt="Hero Shark"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Scroll down arrow */}
        <motion.div
          className="mt-8 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ComicButton size="lg" onClick={scrollToForm}>
            Join the Whitelist
          </ComicButton>
        </motion.div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-[#1e293b] border-y-4 border-black py-4 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-3xl font-[Bangers] text-white mx-8">
              THE CHOMP NEVER ENDS <span className="text-[#38bdf8]">SHACKO</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Registration Section */}
      <section
        id="register"
        className="relative py-32 bg-[#0ea5e9] border-y-4 border-black overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <RegistrationForm />
        </div>
      </section>

      <GalleryGrid />

      {/* Footer */}
      <footer className="bg-[#1e293b] text-white py-12 border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <img
              src="/images/shark-logo.png"
              alt="Shacko Logo"
              className="w-16 h-16 object-contain"
            />
            <h2 className="text-6xl font-[Bangers] text-[#38bdf8]">SHACKO</h2>
          </div>
          <div className="flex justify-center gap-8 mb-8">
            <a
              href="https://x.com/Sharksonbase_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xl font-[Fredoka] font-bold hover:text-[#38bdf8] transition-colors"
              data-testid="footer-link-twitter"
            >
              <SiX className="w-6 h-6" /> Twitter
            </a>
            <a
              href="https://discord.gg/dfxMGDTnpM"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xl font-[Fredoka] font-bold hover:text-[#38bdf8] transition-colors"
              data-testid="footer-link-discord"
            >
              <SiDiscord className="w-6 h-6" /> Discord
            </a>
          </div>
          <p className="text-slate-400 font-mono text-sm">
            © 2024 SHACKO NFT COLLECTION. ALL RIGHTS RESERVED. DON'T GET BITTEN.
          </p>
        </div>
      </footer>
    </div>
  );
}