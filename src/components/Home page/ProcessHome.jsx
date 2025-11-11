import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

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

const ProcessHome = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#101010] to-black text-white py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-stretch">
        
        {/* 🎴 Left Side - Draggable Cards */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 relative h-[400px] flex items-center justify-center"
        >
          {['Our process', 'Simple, seamless', 'Streamlined.'].map((text, i) => (
            <motion.div
              key={i}
              drag
              dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
              whileTap={{ scale: 1.05 }}
              className={`absolute w-80 h-96 flex items-center justify-center text-3xl font-bold text-black rounded-xl shadow-xl px-6 py-4 cursor-grab ${
                i === 0 ? 'bg-gradient-to-r from-blue-300 to-blue-100' :
                i === 1 ? 'bg-gradient-to-r from-green-300 to-green-100' :
                'bg-gradient-to-r from-cyan-300 to-cyan-100'
              }`}
              style={{
                transform: `rotate(${i === 0 ? '-6deg' : i === 1 ? '0deg' : '6deg'}) translateY(${i * 30}px)`,
                zIndex: 10 - i
              }}
              data-aos="fade-right"
            >
              {text}
            </motion.div>
          ))}
        </motion.div>

        {/* 📲 Right Side - Swiper Slider */}
        <div className="md:w-1/2">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{ delay: 5000 }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full max-w-md"
          >
            {steps.map((step, index) => (
              <SwiperSlide
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-blue-500/10 transition min-w-[280px]"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg mb-4">
                    <div className="text-sm">{step.number}</div>
                    <div className="text-[10px] font-light">Step</div>
                  </div>
                  <h4 className="text-cyan-400 font-semibold text-lg mb-2">{step.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProcessHome;
