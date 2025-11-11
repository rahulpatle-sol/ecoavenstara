import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ProcessHome = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Initial Engagement',
      description: 'Initial contact, understanding your needs, and setting up meetings to explore your vision.'
    },
    {
      number: '02',
      title: 'Planning & Documentation',
      description: 'Requirements gathering, cost estimation, and creating proposals, agreements, and specs.'
    },
    {
      number: '03',
      title: 'Design & Development',
      description: 'UI/UX design followed by front-end, back-end, and database development.'
    },
    {
      number: '04',
      title: 'Testing & Integration',
      description: 'Rigorous testing and integration of all components for smooth performance.'
    },
    {
      number: '05',
      title: 'Launch & Post-Launch',
      description: 'Product launch, training, and ongoing support for long-term success.'
    }
  ];

  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-8, 8]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
  };

  return (
    <section
      className="bg-gradient-to-b from-[#0f0f0f] to-black text-white py-20 px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-stretch">
        {/* Left Side */}
        <motion.div
          style={{ rotateY }}
          className="md:w-1/2 flex flex-col justify-center items-center space-y-6"
        >
          {['Our process', 'Simple, seamless', 'Streamlined.'].map((text, i) => (
            <div
              key={i}
              data-aos="fade-right"
              className={`text-4xl font-bold text-black w-full md:w-[400px] py-8 px-4 flex justify-center 
              transform transition-transform duration-700 ease-in-out rounded-xl shadow-xl ${
                i === 0 ? 'bg-gradient-to-r from-blue-300 to-blue-100 -skew-y-6 hover:skew-y-1' :
                i === 1 ? 'bg-gradient-to-r from-green-300 to-green-100 skew-y-3 hover:skew-y-6' :
                'bg-gradient-to-r from-cyan-300 to-cyan-100 -skew-y-3 hover:skew-y-2'
              }`}
            >
              {text}
            </div>
          ))}
        </motion.div>

        {/* Right Side - Infinite Swipe Cards */}
        <div className="md:w-1/2 overflow-hidden">
          <motion.div
            ref={containerRef}
            className="flex gap-6"
            animate={{ x: ['0%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          >
            {[...steps, ...steps].map((step, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-blue-500/10 transition"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg mb-4">
                  <div className="text-sm">{step.number}</div>
                  <div className="text-[10px] font-light">Step</div>
                </div>
                <h4 className="text-cyan-400 font-semibold text-lg mb-2">{step.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessHome;
