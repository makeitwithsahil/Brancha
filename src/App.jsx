import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import Lottie from "react-lottie-player";
import blobAnim from "./blob.json"; // Lottie blob animation
import "./App.css";

const portfolioItems = [
  { src: "/images/design1.webp", alt: "Design 1" },
  { src: "/images/design2.webp", alt: "Design 2" },
  { src: "/images/design3.webp", alt: "Design 3" },
  { src: "/images/design4.webp", alt: "Design 4" },
  { src: "/images/design5.webp", alt: "Design 5" },
  { src: "/images/design6.webp", alt: "Design 6" },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } },
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const { scrollYProgress } = useViewportScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const magicCursorRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      const dot = magicCursorRef.current;
      if (dot) dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    setTimeout(() => setLoading(false), 1500);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const toggleTheme = () => {
    setDarkMode((p) => !p);
    document.documentElement.classList.toggle("dark");
  };

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
      if (!res.ok) throw new Error();
      setStatus("success");
      e.target.reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      alert("Error sending message. Try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white font-sans scroll-smooth">
      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <svg width="48" height="48" fill="#FF6B6B">
                <circle
                  cx="24"
                  cy="24"
                  r="16"
                  stroke="#333"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magic cursor dot */}
      <div
        ref={magicCursorRef}
        className="pointer-events-none fixed top-0 left-0 w-4 h-4 rounded-full bg-pink-500 opacity-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-plus"
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-pink-500 z-40 origin-left"
        style={{ scaleX }}
      />

      {/* Theme Toggle */}
      <motion.button
        className="fixed bottom-4 right-4 p-3 bg-pink-600 text-white rounded-full shadow-lg z-30"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? "🌙" : "☀️"}
      </motion.button>

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50 flex justify-between items-center px-6 py-4 text-sm font-medium"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.span
          className="text-[#FF6B6B] font-bold text-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          Brancha
        </motion.span>
        <div className="hidden md:flex space-x-4">
          {["services", "portfolio", "about", "process", "contact"].map(
            (item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                whileHover={{ y: -2, color: "#FF6B6B" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.a>
            )
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6 text-[#FF6B6B]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md flex flex-col px-6 py-4 md:hidden z-40"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {["services", "portfolio", "about", "process", "contact"].map(
                (id) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    className="py-2 border-b border-neutral-200 dark:border-gray-700"
                    whileHover={{ color: "#FF6B6B" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </motion.a>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.header className="relative min-h-screen flex flex-col justify-center items-center pt-28 px-4 text-center overflow-hidden">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 opacity-30 pointer-events-none"
        >
          <Lottie
            loop
            animationData={blobAnim}
            play
            style={{ width: 600, height: 600 }}
          />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tight z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Branding that connects.
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-6 text-neutral-700 dark:text-neutral-300 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          Websites that work.
        </motion.p>
        <motion.a
          href="#contact"
          className="px-6 py-3 rounded-full bg-[#FF6B6B] text-white font-semibold shadow-lg z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          Get a Free Sample
        </motion.a>
      </motion.header>

      {/* Services Section */}
      <AnimatePresence exitBeforeEnter>
        <motion.section
          key="services"
          id="services"
          className="w-full max-w-6xl px-6 py-20 mx-auto text-center"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            What We Do
          </h2>
          <p className="text-lg text-neutral-600 mb-6">
            Helping cafés, salons & shops grow online
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Posters",
                desc:
                  "Grab attention online & offline with stunning visuals.",
              },
              {
                title: "Websites",
                desc:
                  "Modern, responsive websites that build trust.",
              },
              {
                title: "Social Media",
                desc:
                  "Design + strategy that keeps your brand active.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="p-6 bg-neutral-50 dark:bg-gray-800 rounded-lg shadow"
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  boxShadow: "0 12px 20px rgba(0,0,0,0.06)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
              >
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Portfolio Section */}
      <AnimatePresence exitBeforeEnter>
        <motion.section
          key="portfolio"
          id="portfolio"
          className="w-full max-w-6xl px-6 py-20 mx-auto text-center"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Work Samples
          </h2>
          <p className="text-lg text-neutral-600 mb-6">
            Real designs. Real impact.
          </p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            animate="visible"
          >
            {portfolioItems.map((item, i) => (
              <motion.div
                key={i}
                className="rounded overflow-hidden shadow-sm bg-neutral-100 dark:bg-gray-800 aspect-square"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* About Section */}
      <AnimatePresence exitBeforeEnter>
        <motion.section
          key="about"
          id="about"
          className="w-full max-w-6xl px-6 py-20 mx-auto text-center"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Why Brancha?
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300 leading-relaxed">
            We’re not just another agency. We partner with you to create designs
            that not only look good, but also work — online, in print, and
            everywhere your brand lives.
          </p>
        </motion.section>
      </AnimatePresence>

      {/* Process Section */}
      <AnimatePresence exitBeforeEnter>
        <motion.section
          key="process"
          id="process"
          className="w-full max-w-6xl px-6 py-20 mx-auto text-center"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-600 mb-6">
            Simple, clear steps to launch your brand
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-left text-sm text-neutral-700 dark:text-neutral-300">
            {[
              "1. Chat: DM us @getbrancha on Instagram.",
              "2. Free Sample: We send a design tailored to you.",
              "3. Feedback: You approve or ask for tweaks.",
              "4. Delivery: Final files or live website in hand.",
            ].map((text, i) => (
              <motion.div
                key={i}
                className="p-4"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {text}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Contact Section */}
      <AnimatePresence exitBeforeEnter>
        <motion.section
          key="contact"
          id="contact"
          className="w-full max-w-6xl px-6 py-20 mx-auto text-center"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Let’s Work Together
          </h2>
          <p className="text-lg text-neutral-600 mb-6">
            Send a message or request a sample.
          </p>
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto space-y-4 text-left relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <input
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border border-neutral-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 border border-neutral-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="w-full px-4 py-2 border border-neutral-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 h-32"
            />
            <motion.button
              type="submit"
              disabled={status === "loading"}
              className={`w-full bg-[#FF6B6B] text-white py-2 rounded-full font-semibold ${
                status === "loading" ? "opacity-70 cursor-not-allowed" : ""
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {status === "loading"
                ? "Sending…"
                : status === "success"
                ? "Sent!"
                : "Send Message"}
            </motion.button>
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-90 rounded"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-2xl font-semibold text-[#FF6B6B]">
                    ✓ Thank you!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            Or message us on{" "}
            <a
              href="https://instagram.com/getbrancha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B6B] underline"
            >
              Instagram
            </a>.
          </p>
        </motion.section>
      </AnimatePresence>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-neutral-400 dark:text-neutral-500">
        © 2025 Brancha Agency. All rights reserved.
      </footer>
    </div>
  );
}
