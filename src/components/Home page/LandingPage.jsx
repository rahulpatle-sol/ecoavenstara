import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Social from "./Social";
import Modal from "./Modal";
import ContactForm from "../ContactForm";

gsap.registerPlugin(ScrollTrigger);

const Typewriter = ({ text }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [text]);
  return <span className="font-mono text-green-400">{displayed}</span>;
};

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef(null);
  const blobRef1 = useRef(null);
  const blobRef2 = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ smooth: true, lerp: 0.1 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".hero-text"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: "power3.out" }
      );
    }

    if (blobRef1.current) {
      gsap.to(blobRef1.current, {
        yPercent: -8,
        scrollTrigger: {
          trigger: blobRef1.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
    if (blobRef2.current) {
      gsap.to(blobRef2.current, {
        yPercent: 10,
        scrollTrigger: {
          trigger: blobRef2.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-['Satoshi','Inter',sans-serif']">
      {/* Gradient veil */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(1200px 600px at 15% 20%, rgba(79,70,229,0.18), transparent 60%), radial-gradient(1000px 500px at 85% 70%, rgba(16,185,129,0.18), transparent 60%)",
        }}
      />

      {/* Floating blobs */}
      <motion.div
        ref={blobRef1}
        initial={{ y: 0 }}
        animate={{ y: [-12, 12, -12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-20 top-28 w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #7c3aed, #22d3ee, #10b981)",
          filter: "blur(40px)",
          opacity: 0.6,
        }}
      />
      <motion.div
        ref={blobRef2}
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-20 bottom-24 w-[240px] h-[240px] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #f59e0b, #f472b6, #a78bfa)",
          filter: "blur(32px)",
          opacity: 0.5,
        }}
      />

      {/* Right-side blobs + lines */}
      <div className="absolute right-0 top-0 h-full w-[300px] flex flex-col items-center justify-center gap-12 pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-[160px] h-[160px] rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, #7c3aed, #22d3ee, #10b981)",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "120px" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-[2px] bg-gradient-to-b from-green-400 via-purple-400 to-cyan-400"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-[100px] h-[100px] rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, #f59e0b, #f472b6, #a78bfa)",
            filter: "blur(32px)",
          }}
        />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "80px" }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="w-[2px] bg-gradient-to-b from-purple-400 via-green-400 to-cyan-400"
        />
      </div>

      {/* Hero */}
      <div ref={heroRef} className="relative z-20 flex flex-col items-center justify-center text-center min-h-[88vh] px-6">
        <h1 className="hero-text text-[44px] md:text-[64px] font-semibold leading-tight tracking-tight">
          Elevate your Digital Presence with{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            Ecoavenstra
          </span>
          !
        </h1>
        <p className="hero-text mt-5 text-white/70 text-lg max-w-2xl">
          We craft immersive digital experiences through stunning design, robust code, and cutting‑edge 3D visuals.
        </p>
        <div className="hero-text mt-6">
          <Typewriter text="> Initializing immersive UI..." />
        </div>
        <div className="hero-text mt-10 flex gap-6 flex-wrap justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-lg hover:bg-white/90 transition"
          >
            Get Started
          </button>
          <a
            href="#portfolio"
            className="px-8 py-3 border border-white/30 rounded-full text-lg font-semibold hover:bg-white/10 transition"
          >
            Explore
          </a>
        </div>
      </div>

      {/* Social icons */}
      <div className="absolute bottom-10 left-10 z-30">
        <Social />
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactForm />
      </Modal>
    </div>
  );
};

export default LandingPage;
