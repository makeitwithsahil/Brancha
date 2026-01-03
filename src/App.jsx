import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Process = lazy(() => import('./pages/Process'));
const Services = lazy(() => import('./pages/Services'));
const NotFound = lazy(() => import('./pages/NotFound'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-[#FF6B6B] rounded-full animate-spin"></div>
        <p className="text-sm text-neutral-500 font-light">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}