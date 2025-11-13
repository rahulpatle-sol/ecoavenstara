import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { number: '01', title: 'System', subtitle: 'Branding, Design System', duration: '0d - 5d' },
  { number: '02', title: 'Prototype', subtitle: 'Low-fidelity prototype, Wireframes', duration: '5d - 12d' },
  { number: '03', title: 'Design', subtitle: 'Full design version, High-fidelity prototype', duration: '12d - 24d', highlight: true },
  { number: '04', title: 'Delivery', subtitle: 'Project delivery, Web development', duration: '24d - 30d' },
];

const ProjectTimeline = () => {
  const timelineRef = useRef(null);
  const CARD_HEIGHT = 'h-40';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-step', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.timeline-step.highlight', {
        scale: 1.02,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        boxShadow: '0 0 25px rgba(52, 211, 153, 0.6)',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        },
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={timelineRef} className="w-full bg-[#050505] text-white pt-20 pb-16 overflow-hidden min-h-screen">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-white max-w-7xl mx-auto px-6">
        Our Transparent <span className="text-green-500">4-Step</span> Process
      </h2>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              drag
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`timeline-step w-full ${CARD_HEIGHT} flex flex-col justify-center p-6 rounded-xl transition-all duration-500 cursor-pointer 
                ${step.highlight
                  ? 'highlight bg-green-500 text-black shadow-2xl font-extrabold'
                  : 'bg-white text-black border border-white/10 hover:bg-gray-100'}
              `}
            >
              <div>
                <p className={`text-3xl md:text-4xl mb-1 font-serif ${step.highlight ? 'text-black' : 'text-gray-900'}`}>{step.number}</p>
                <h3 className={`text-xl md:text-2xl font-bold ${step.highlight ? 'text-black' : 'text-gray-900'}`}>{step.title}</h3>
                <p className={`text-xs mt-1 ${step.highlight ? 'text-black/70' : 'text-gray-600'}`}>{step.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Chart */}
        <div className="mt-16 text-xs relative">
          <div className="flex justify-between text-gray-400 mb-2 border-b border-white/10 pb-1">
            <span className="w-[10%] text-left">0d</span>
            <span className="w-[10%] text-center">5d</span>
            <span className="w-[10%] text-center">12d</span>
            <span className="w-[10%] text-center">20d</span>
            <span className="w-[10%] text-center">24d</span>
            <span className="w-[10%] text-center">27d</span>
            <span className="w-[10%] text-right">30d</span>
          </div>

          <div className="space-y-4 pt-4">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '40%' }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="bg-green-700/60 h-6 flex items-center justify-end px-3 rounded-md"
              style={{ marginLeft: '10%' }}
            >
              <span className="text-white font-medium">Wireframes (Prototype)</span>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '50%' }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="bg-green-500 h-6 flex items-center justify-end px-3 rounded-md shadow-lg shadow-green-900/50"
              style={{ marginLeft: '30%' }}
            >
              <span className="text-black font-medium">Design Concept & High-Fidelity</span>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '25%' }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="bg-green-700/60 h-6 flex items-center justify-start px-3 rounded-md"
              style={{ marginLeft: '70%' }}
            >
              <span className="text-white font-medium">Web Development</span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-400">This timeline represents our typical <span className="text-green-400 font-semibold">30-day MVP delivery cycle</span>.</p>
      </div>
    </section>
  );
};

export default ProjectTimeline;
