import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import Social from "./Social";
import Modal from "./Modal";
import ContactForm from "../ContactForm";
// import SplineHero from "./SpnineHero";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({ smooth: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP hero entrance
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".hero-text"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }

    // Mobile detection
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-sans">
      
      {/* Background Video */}
      {!isMobile && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{ mixBlendMode: "screen", transform: "scale(1.1)", filter: "brightness(1.1)" }}
        >
          <source src="https://ik.imagekit.io/y8vbhvt7s/New%20Folder/297870.mp4?updatedAt=1762835232301" type="video/mp4" />
        </video>
      )}

      {/* Matte Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-md" />

      {/* Hero Content */}
      <div ref={heroRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="flex flex-col sm:flex-row gap-2 text-4xl sm:text-6xl font-extrabold leading-tight">
          <span className="hero-text">Elevate your</span>
          <span className="hero-text bg-gradient-to-r from-cyan-400 via-green-400 to-blue-600 bg-clip-text text-transparent">
            Digital Presence
          </span>
          <span className="hero-text">with Ecoavenstra!</span>
        </h1>

        <p className="hero-text mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl">
          We craft immersive digital experiences through stunning design, robust code, and cutting-edge 3D visuals.
        </p>

        <div className="hero-text mt-10 flex gap-6 flex-wrap justify-center">
          <button
            onClick={openModal}
            className="px-8 py-3 bg-gradient-to-r from-blue-700 to-green-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-blue-500/40 transition"
          >
            Get in Touch
          </button>
          <a
            href="#portfolio"
            className="px-8 py-3 border border-white/40 rounded-full text-lg font-semibold hover:bg-white/10 transition"
          >
            View Work
          </a>
        </div>
      </div>

      {/* Social Icons */}
      <div className="absolute bottom-10 left-6 sm:left-16 z-30">
        <Social />
      </div>

      {/* Contact Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ContactForm />
      </Modal>


      {/* <SplineHero/> */}
    </div>
  );
};

export default LandingPage;
