// Services.jsx — upgraded cinematic UI (drop-in ready)
// Prereqs: npm i framer-motion swiper react-icons axios
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, animate } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { RiStarLine, RiTruckLine, RiShieldLine } from "react-icons/ri";

import serviceVideo from "../../src/assets/services_video.mp4";
import bgimage from "/src/assets/bg-about.png"; // optional small bg accent

const fallbackServices = [
  {
    id: 7,
    title: "Web Development",
    shortDescription:
      "From lightweight MVPs to complex web products — we take your idea to production-ready apps.",
  },
  {
    id: 8,
    title: "eCommerce Development",
    shortDescription:
      "Modern, conversion-oriented stores with secure payments and admin autonomy.",
  },
  {
    id: 9,
    title: "Digital Marketing Services",
    shortDescription:
      "Data-driven campaigns to increase visibility, leads, and ROI across channels.",
  },
  {
    id: 10,
    title: "UI/UX Designing",
    shortDescription:
      "Cinematic interfaces, motion systems, and component-driven design that converts.",
  },
  {
    id: 11,
    title: "Portfolio & Landing Pages",
    shortDescription:
      "High-impact pages built for conversion, clarity and brand storytelling.",
  },
];

/* ---------- AnimatedCounter ---------- */
const AnimatedCounter = ({ from = 0, to = 0, duration = 1.6, suffix = "" }) => {
  const [value, setValue] = useState(from);
  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate(v) {
        setValue(Math.round(v));
      },
      ease: [0.22, 0.8, 0.2, 1],
    });
    return () => controls && controls.stop();
  }, [from, to, duration]);
  // format large numbers
  const formatted = value >= 1000 ? `${Math.round(value / 1000)}k` : value;
  return <span>{formatted}{suffix}</span>;
};

const pricingPlans = [
  {
    title: "Standard Plan",
    originalPrice: "₹54,999",
    discountedPrice: "₹49,999",
    gst: "18% GST ₹ 8999",
    features: [
      "8 pages Website",
      "1 Year Free Domain",
      "1 Year Hosting",
      "Dynamic Website (Premium Design)",
      "Free SSL",
      "5 Email ids",
      "SEO Friendly",
      "Responsive",
    ],
    buttonText: "Call Now",
  },
  {
    title: "Premium Plan",
    originalPrice: "₹109,999",
    discountedPrice: "₹99,999",
    gst: "18% GST ₹17999",
    features: [
      "12 pages",
      "Admin Access",
      "Payment Gateway",
      "Unlimited Media Upload",
      "10 Email ids",
      "24/7 Hosting Support",
    ],
    buttonText: "Call Now",
  },
  {
    title: "Custom Plan",
    originalPrice: "₹???",
    discountedPrice: "Custom",
    gst: "18% GST Applicable",
    features: ["Tailored to requirement", "Priority support", "SLA & Retainers"],
    buttonText: "Discuss",
  },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const heroRef = useRef(null);

  useEffect(() => {
    // fetch services but fallback gracefully
    let mounted = true;
    axios
      .get("https://ecoavenstra-be.onrender.com/api/v1/admin/services")
      .then((res) => {
        if (!mounted) return;
        const data = res?.data?.services;
        setServices(Array.isArray(data) && data.length ? data : fallbackServices);
      })
      .catch(() => {
        setServices(fallbackServices);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#080808] text-white">
      {/* HERO */}
      <div ref={heroRef} className="relative h-[78vh] md:h-[72vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          loop
          muted
        >
          <source src={serviceVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Services that move the needle — design, build, grow.
              </h1>
              <p className="max-w-2xl text-gray-300">
                Leverage our product-first approach to accelerate your roadmap. We craft elegant experiences, reliable systems, and growth loops that scale.
              </p>

              <div className="flex gap-3 flex-wrap">
                <Link to={"https://wa.me/+919752505639"} target="_blank" className="inline-block">
                  <motion.button whileHover={{ scale: 1.03 }} className="bg-[#1c3987] px-6 py-3 rounded-full shadow-lg">
                    Request Free Consultation
                  </motion.button>
                </Link>

                <motion.a whileHover={{ scale: 1.03 }} href="#plans" className="inline-block">
                  <button className="bg-white/6 px-6 py-3 rounded-full border border-white/8">See Plans</button>
                </motion.a>
              </div>

              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-3 bg-white/6 px-4 py-2 rounded-lg border border-white/8">
                  <RiStarLine className="text-xl text-cyan-300" />
                  <div>
                    <div className="text-sm text-gray-300">Avg Rating</div>
                    <div className="font-semibold">4.9 / 5</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/6 px-4 py-2 rounded-lg border border-white/8">
                  <RiShieldLine className="text-xl text-emerald-300" />
                  <div>
                    <div className="text-sm text-gray-300">Trust</div>
                    <div className="font-semibold">Secure & SLA-ready</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Services swiper / cards */}
            <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <Swiper
                modules={[Autoplay, Pagination, EffectCoverflow]}
                autoplay={{ delay: 4200 }}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView={"auto"}
                coverflowEffect={{ rotate: 15, depth: 120, slideShadows: true }}
                pagination={{ clickable: true }}
                className="max-w-lg mx-auto"
              >
                {services.map((s) => (
                  <SwiperSlide key={s.id ?? s.title} className="min-w-[320px]">
                    <motion.article
                      whileHover={{ scale: 1.02, y: -6 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      className="relative rounded-2xl overflow-hidden bg-white/6 border border-white/8 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/10 pointer-events-none" />
                      <h3 className="text-xl font-semibold z-10 relative">{s.title}</h3>
                      <p className="text-gray-300 mt-3 z-10 relative">{s.shortDescription ?? s.description}</p>

                      <div className="mt-6 flex items-center gap-3 z-10 relative">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white">
                          <RiTruckLine />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Delivery</div>
                          <div className="font-semibold">3–8 weeks</div>
                        </div>
                      </div>

                      <div className="mt-6 z-10 relative flex justify-between items-center">
                        <Link to={"https://wa.me/+919752505639"} target="_blank">
                          <button className="bg-[#1c3987] px-4 py-2 rounded-full">Request Quote</button>
                        </Link>
                        <a className="text-sm text-gray-300">Learn more →</a>
                      </div>
                    </motion.article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services GRID (expanded) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Our Development & Digital Marketing Services
        </motion.h2>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-center text-gray-300 max-w-3xl mx-auto mb-10">
          Our team delivers custom and universal features for seamless customer journeys — reliable engineering and data-driven marketing to grow revenue.
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id ?? idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="relative rounded-2xl overflow-hidden border border-white/8 bg-black/60 p-6 hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            >
              <img
                src={`https://images.pexels.com/photos/32997/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-10"
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <div className="text-sm text-gray-300">Service</div>
                </div>
                <p className="text-gray-300 mt-3">{service.shortDescription ?? service.description}</p>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-300">Timeline</div>
                  <div className="font-semibold">3–6 weeks</div>
                </div>

                <div className="mt-4 flex gap-3">
                  <Link to={"https://wa.me/+919752505639"} target="_blank" className="inline-block">
                    <button className="bg-[#1c3987] px-4 py-2 rounded-full">Start</button>
                  </Link>
                  <button className="bg-white/6 px-4 py-2 rounded-full border border-white/8">Details</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing / Plans */}
      <section id="plans" className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Pricing Plans
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className={`rounded-2xl overflow-hidden border ${idx === 1 ? "border-cyan-400" : "border-white/8"} bg-black/70 p-6 shadow-lg`}
            >
              <div className="text-center mb-4">
                <div className="text-sm text-gray-300">{plan.title}</div>
                <div className="text-lg line-through text-gray-400">{plan.originalPrice}</div>
                <div className="text-3xl font-bold mt-2">{plan.discountedPrice}</div>
                <div className="text-sm text-gray-400">{plan.gst}</div>
              </div>

              <ul className="text-sm space-y-2 mb-4">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-300 mt-1">•</span>
                    <span className="text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <Link to={"https://wa.me/+919752505639"} target="_blank">
                  <button className="bg-[#1c3987] px-6 py-3 rounded-full">{plan.buttonText}</button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Small metrics strip */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="bg-black/80 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="text-center">
            <div className="text-2xl font-bold"><AnimatedCounter from={0} to={4} suffix="+" /></div>
            <div className="text-gray-300">Years In Business</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold"><AnimatedCounter from={0} to={850000} suffix="" /></div>
            <div className="text-gray-300">Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold"><AnimatedCounter from={0} to={10} suffix="%" /></div>
            <div className="text-gray-300">Avg Conversion Lift</div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;