import { useState, useEffect, useLayoutEffect, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import InstagramPopup from './components/InstagramPopup';
import "./App.css"; // Import your global styles

// Portfolio Items with optimized image loading
const portfolioItems = [
  { src: "/images/design1.webp", alt: "Design 1", width: 800, height: 800 },
  { src: "/images/design2.webp", alt: "Design 2", width: 800, height: 800 },
  { src: "/images/design3.webp", alt: "Design 3", width: 800, height: 800 },
  { src: "/images/design4.webp", alt: "Design 4", width: 800, height: 800 },
  { src: "/images/design5.webp", alt: "Design 5", width: 800, height: 800 },
  { src: "/images/design6.webp", alt: "Design 6", width: 800, height: 800 },
];

// Reusable Section with optimized animations and intersection observer
const Section = ({ id, title, subtitle, children }) => (
  <motion.section
    id={id}
    className="w-full max-w-6xl px-6 py-20 mx-auto text-center scroll-mt-24"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "100px" }}
    transition={{ 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1
    }}
  >
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">{subtitle}</p>}
    <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
      {children}
    </Suspense>
  </motion.section>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Theme preference with debounce and system preference listener
  const applyTheme = useCallback((isDark) => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  }, []);

  // Load Theme Preference
  useLayoutEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      const isDark = e.matches;
      setDarkMode(isDark);
      applyTheme(isDark);
    };

    try {
      const session = sessionStorage.getItem("theme");
      const local = localStorage.getItem("theme");
      const prefersDark = mediaQuery.matches;

      const theme = session ?? local ?? (prefersDark ? "dark" : "light");
      const isDark = theme === "dark";
      setDarkMode(isDark);
      applyTheme(isDark);
    } catch (e) {
      console.error("Error accessing storage:", e);
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [applyTheme]);

  // Save theme preference with storage error handling
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const mode = darkMode ? "dark" : "light";
      localStorage.setItem("theme", mode);
      sessionStorage.setItem("theme", mode);
      applyTheme(darkMode);
    } catch (e) {
      console.error("Error saving theme preference:", e);
    }
  }, [darkMode, applyTheme, mounted]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.target);
    
    try {
      const res = await fetch("https://formspree.io/f/xyzjlzrl", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      
      if (!res.ok) throw new Error("Failed to submit form");
      setStatus("success");
      e.target.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  // Close mobile menu when clicking on nav links
  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  if (!mounted) {
    // Return a blank div during SSR to avoid hydration mismatch
    return <div className="min-h-screen bg-white dark:bg-neutral-900" />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <InstagramPopup />
      <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans scroll-smooth">
        {/* Navbar */}
        <motion.nav
          className="sticky top-0 left-0 right-0 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-lg shadow-sm z-50 flex justify-between items-center px-6 py-4 text-sm font-medium"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span 
            className="text-[#FF6B6B] font-bold text-lg cursor-pointer" 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Brancha
          </motion.span>

          <div className="hidden md:flex space-x-6 uppercase tracking-wide">
            {["services", "portfolio", "about", "process", "contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                onClick={handleNavClick}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-neutral-700 dark:text-neutral-300 hover:text-[#FF6B6B] transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white dark:bg-neutral-700 shadow hover:scale-105 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button 
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6 text-[#FF6B6B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="absolute top-full left-0 w-full bg-white dark:bg-neutral-800 px-6 py-4 flex flex-col md:hidden z-40 shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {["services", "portfolio", "about", "process", "contact"].map((id) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={handleNavClick}
                    whileHover={{ x: 4 }}
                    className="py-2 border-b border-neutral-200 dark:border-neutral-700 uppercase text-neutral-700 dark:text-neutral-300 hover:text-[#FF6B6B] transition"
                  >
                    {id}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Header */}
        <motion.header
          className="min-h-screen flex flex-col justify-center items-center -mt-10 px-6 sm:px-8 pt-36 pb-24 text-center bg-white dark:bg-neutral-900 transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-[2.5rem] sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Branding that builds trust.
            </motion.h1>

            <motion.p
              className="mt-5 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              We craft visuals and websites that speak to your audience — turning first impressions into lasting connections. Professional, modern, and made to convert.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Primary CTA */}
              <motion.a
                href="#contact"
                className="inline-block px-7 py-3.5 rounded-full bg-[#FC696A] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-lg transition-all duration-300 hover:bg-[#e85a5a] focus:outline-none focus:ring-2 focus:ring-[#FC696A] focus:ring-offset-2"
                whileHover={{ scale: 1.045 }}
                whileTap={{ scale: 0.96 }}
              >
                Get a Free Sample
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#portfolio"
                className="inline-block px-7 py-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 font-medium text-sm sm:text-base bg-white dark:bg-neutral-900 hover:border-[#FC696A] hover:text-[#FC696A] transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FC696A] focus:ring-offset-2"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.96 }}
              >
                Explore Our Work
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="mt-14 w-full max-w-3xl border-t border-neutral-200 dark:border-neutral-700 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Trusted by cafés, salons, creators and small businesses that want better design, not bloated agencies. You get quality, fast — without fluff.
            </p>
          </motion.div>
        </motion.header>

        {/* Services */}
        <Section
          id="services"
          title="Our Services"
          subtitle="Creative solutions tailored for local businesses — built to attract, convert, and grow."
        >
          <motion.div
            className="grid md:grid-cols-3 gap-6 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "50px" }}
            variants={{ 
              visible: { 
                transition: { 
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                } 
              } 
            }}
          >
            {[
              {
                title: "Custom Posters",
                desc: "High-quality promotional posters designed to fit your brand's voice — perfect for in-store, social media, and ads. Fully customized, print-ready, and optimized for visibility.",
              },
              {
                title: "Professional Websites",
                desc: "Responsive, fast-loading websites that make your business look modern and credible. Includes one-page designs, service showcases, and contact integration — everything needed to convert visitors.",
              },
              {
                title: "Social Media Design",
                desc: "Consistent, eye-catching post designs that match your brand and engage your audience. From story templates to monthly post packs — we keep your content looking sharp.",
              },
              {
                title: "Brand Identity",
                desc: "We create the visual foundation of your brand — logos, colors, fonts, and templates — so every touchpoint looks cohesive, premium, and memorable.",
              },
              {
                title: "Ongoing Design Support",
                desc: "Need 5–10+ posters every month? We offer monthly contracts for continuous creative support — ideal for cafés, gyms, salons, and shops with regular promotions.",
              },
              {
                title: "Growth Strategy Guidance",
                desc: "Beyond design — we help you decide what to post, how often, and where to show up. Focused on results and brand alignment, not just aesthetics.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow transition-all will-change-transform"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -4,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <h3 className="text-lg font-semibold mb-2 text-[#FF6B6B]">{s.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Portfolio */}
        <Section id="portfolio" title="Work Samples" subtitle="Selected projects crafted for real businesses.">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "50px" }}
            variants={{ 
              visible: { 
                transition: { 
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                } 
              } 
            }}
          >
            {portfolioItems.map((item, i) => (
              <motion.div
                key={i}
                className="relative group overflow-hidden rounded-xl bg-white dark:bg-neutral-800 shadow-lg border border-neutral-200 dark:border-neutral-700 will-change-transform"
                variants={{ 
                  hidden: { opacity: 0, y: 30 }, 
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5, 
                      ease: "easeOut" 
                    } 
                  } 
                }}
                whileHover={{ scale: 1.015 }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  width={item.width}
                  height={item.height}
                  className="w-full h-full object-cover aspect-square transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{item.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* About */}
        <Section id="about" title="Why Brancha?" subtitle="More than design. A business partner.">
          <motion.div
            className="max-w-3xl mx-auto text-lg text-neutral-700 dark:text-neutral-400 leading-relaxed space-y-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              We're not just designers — we're problem solvers. We dive deep into your brand, your audience,
              and your goals to create visuals and digital experiences that actually move the needle.
            </p>
            <p>
              Our focus isn't just on aesthetics. Every poster, page, and post is crafted to attract attention,
              spark curiosity, and drive real-world results — from increased foot traffic to stronger online
              presence.
            </p>
            <p>
              Brancha is built for cafés, salons, shops and small local businesses that want to stand out
              and win — without wasting time or money on generic templates or boring designs.
            </p>
          </motion.div>
        </Section>

        {/* Process */}
        <Section id="process" title="How It Works" subtitle="A simple, effective process that builds trust.">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-left text-sm text-neutral-700 dark:text-neutral-400">
            {[
              {
                step: "1",
                title: "Initial Contact",
                detail:
                  "Start by sending us a direct message on Instagram @getbrancha. It's quick and straightforward.",
              },
              {
                step: "2",
                title: "Free Design Sample",
                detail:
                  "We create and send you a personalized poster design sample — completely free, with no obligation.",
              },
              {
                step: "3",
                title: "Feedback & Approval",
                detail:
                  "Review the design and share your thoughts. We revise it if needed to match your brand perfectly.",
              },
              {
                step: "4",
                title: "Package or Service Deal",
                detail:
                  "Once you're satisfied, you can purchase a poster pack or sign up for a service contract tailored to your needs.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-800 shadow-sm will-change-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              >
                <h4 className="font-semibold mb-1 text-[#FF6B6B]">{`${s.step}. ${s.title}`}</h4>
                <p className="leading-relaxed">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Let's Work Together" subtitle="Send a message or request a sample.">
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto space-y-5 text-left relative bg-white/40 dark:bg-neutral-700/40 backdrop-blur-md border border-neutral-200 dark:border-neutral-600 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <input
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] transition"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] transition"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] transition h-32 resize-none"
            />

            <motion.button
              type="submit"
              disabled={status !== "idle"}
              className={`w-full text-sm bg-[#FF6B6B] text-white py-3 rounded-full font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 ${
                status !== "idle" ? "opacity-70 cursor-not-allowed" : ""
              }`}
              whileHover={status === "idle" ? { scale: 1.04 } : {}}
              whileTap={status === "idle" ? { scale: 0.96 } : {}}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
            >
              {status === "loading" 
                ? "Sending..." 
                : status === "success" 
                  ? "Sent!" 
                  : status === "error"
                    ? "Error - Try Again"
                    : "Send Message"}
            </motion.button>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xl font-semibold text-[#FF6B6B] tracking-wide">
                    ✓ Message Delivered!
                  </span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xl font-semibold text-red-500 tracking-wide">
                    ✗ Failed to send. Please try again.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400 text-center">
            Prefer chatting? DM us on{" "}
            <a
              href="https://instagram.com/getbrancha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B6B] underline hover:text-[#e75e5e] transition-colors"
            >
              Instagram
            </a>
            .
          </p>
        </Section>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-neutral-400 dark:text-neutral-500">
          © {new Date().getFullYear()} Brancha Agency. All rights reserved.
        </footer>
      </div>
    </LazyMotion>
  );
}