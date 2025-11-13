// Services.jsx — FINAL PRODUCTION-READY CODE
// Featuring Cinematic Hero, Dynamic Service Display (Portfolio/Description Split UI),
// Premium 3D Effects, Q&A Accordion, and Standard Pricing Plans.

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, animate } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import {
  RiStarLine,
  RiTruckLine,
  RiShieldLine,
  RiArrowRightLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCodeSSlashLine,
  RiRocket2Line,
  RiWalletLine,
  RiLayoutLine,
  RiShoppingBag3Line,
} from "react-icons/ri";

import serviceVideo from "../../src/assets/services_video.mp4";

/* -------------------------------------------------------------------------- */
/* ---------- 1. Dynamic & Comprehensive Service Data (7 Services) ---------- */
/* -------------------------------------------------------------------------- */

const allServicesData = [
  {
    id: 7,
    title: "Web Development",
    shortDescription: "From lightweight MVPs to complex web products — we take your idea to production-ready apps.",
    pricing: {
      originalPrice: "₹80,000",
      discountedPrice: "₹65,000",
      offer: "Free 3-month support",
      buttonText: "Start a Project",
    },
    techStack: ["React/Next.js", "Node.js/Express", "MongoDB/PostgreSQL", "AWS/Vercel"],
    portfolioExamples: [
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        question: "Why is professional Web Development essential?",
        answer: "A custom-built website is your central digital asset, ensuring **scalability, security, and a unique user experience** that template sites simply cannot offer. It is the foundation of digital trust.",
        icon: RiRocket2Line,
      },
      {
        question: "What exactly is included in the package?",
        answer: "Includes a custom front-end and back-end build, database integration, API development, 1 year of domain/hosting setup, full responsiveness, and detailed project documentation.",
        icon: RiCodeSSlashLine,
      },
      {
        question: "How does this benefit my business long-term?",
        answer: "You gain a system built for growth. Reduced technical debt, faster feature deployment, superior performance, and ultimately, a higher conversion rate across all devices.",
        icon: RiWalletLine,
      },
    ],
  },
  {
    id: 8,
    title: "eCommerce Development",
    shortDescription: "Modern, conversion-oriented stores with secure payments and admin autonomy.",
    pricing: {
      originalPrice: "₹1,50,000",
      discountedPrice: "₹1,25,000",
      offer: "Payment Gateway setup included",
      buttonText: "Discuss Store",
    },
    techStack: ["Shopify Plus", "WooCommerce", "MERN Stack", "Stripe/Razorpay"],
    portfolioExamples: [
      "https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        question: "Why choose our Custom eCommerce solutions?",
        answer: "We focus on optimizing the **Customer Journey and reducing Cart Abandonment**. Our stores are fast, inventory-aware, and built on secure foundations for peace of mind.",
        icon: RiShoppingBag3Line,
      },
      {
        question: "Key features included in this service?",
        answer: "Features include: Product Management, Secure Checkout, Inventory Tracking, Multi-Vendor support (optional), Shipping/Tax Automation, and an intuitive Admin Dashboard.",
        icon: RiCodeSSlashLine,
      },
      {
        question: "What is our tech stack for eCommerce?",
        answer: "We primarily use scalable solutions like **Next.js** for frontend performance and secure payment integrations with industry leaders like **Stripe** or local providers like **Razorpay**.",
        icon: RiShieldLine,
      },
    ],
  },
  {
    id: 9,
    title: "Digital Marketing Services",
    shortDescription: "Data-driven campaigns to increase visibility, leads, and ROI across channels.",
    pricing: {
      originalPrice: "₹45,000/mo",
      discountedPrice: "₹35,000/mo",
      offer: "10% off on 6-month contracts",
      buttonText: "View Packages",
    },
    techStack: ["Google Ads", "Facebook Ads", "SEO (Ahrefs/SEMRush)", "Content Strategy"],
    portfolioExamples: [
      "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        question: "How do you guarantee ROI?",
        answer: "We use a **data-first approach**. Every campaign starts with deep audience research and is continuously optimized based on real-time CPA and ROAS metrics. We focus on profitable growth, not just vanity metrics.",
        icon: RiWalletLine,
      },
      {
        question: "What core services are covered?",
        answer: "We cover **SEO (Technical & Content)**, **Paid Media (PPC)**, **Social Media Strategy**, and **Email Marketing**—a fully integrated approach to capture and convert users at every stage.",
        icon: RiRocket2Line,
      },
      {
        question: "Our reporting and transparency policy?",
        answer: "You receive weekly performance reports, access to a real-time dashboard, and monthly strategy calls. Full transparency is our promise.",
        icon: RiShieldLine,
      },
    ],
  },
  {
    id: 10,
    title: "UI/UX Designing",
    shortDescription: "Cinematic interfaces, motion systems, and component-driven design that converts.",
    pricing: {
      originalPrice: "₹65,000",
      discountedPrice: "₹55,000",
      offer: "Free wireframing session",
      buttonText: "Get Design Quote",
    },
    techStack: ["Figma", "Framer", "Adobe Suite", "Lottie/Motion"],
    portfolioExamples: [
      "https://images.pexels.com/photos/5082562/pexels-photo-5082562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4500355/pexels-photo-4500355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        question: "What is the core focus of your UX process?",
        answer: "User-centricity. We map user flows, identify pain points, and design interfaces that are **intuitive, accessible, and enjoyable** to use, directly reducing bounce rates.",
        icon: RiLayoutLine,
      },
      {
        question: "What design deliverables do I receive?",
        answer: "You receive high-fidelity Figma files, a comprehensive **Design System (components)**, interactive prototypes, and clear handoff documentation for your development team.",
        icon: RiCodeSSlashLine,
      },
      {
        question: "Do you include motion/cinematic elements?",
        answer: "Yes, we specialize in modern, subtle motion design using tools like Framer and Lottie to add a polished, premium feel to your product's interactions.",
        icon: RiRocket2Line,
      },
    ],
  },
  {
    id: 11,
    title: "Portfolio & Landing Pages",
    shortDescription: "High-impact pages built for conversion, clarity and brand storytelling.",
    pricing: {
      originalPrice: "₹24,999",
      discountedPrice: "₹19,999",
      offer: "Guaranteed 90+ PageSpeed Score",
      buttonText: "Launch My Page",
    },
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Contentful CMS"],
    portfolioExamples: [
      "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4198278/pexels-photo-4198278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        question: "Why should I use a custom portfolio/landing page?",
        answer: "It’s a focused sales machine. A custom page eliminates distractions and drives visitors toward a single goal (like a lead form or download) far more effectively than a multi-page site.",
        icon: RiRocket2Line,
      },
      {
        question: "What is included in your Landing Page service?",
        answer: "Includes a conversion-optimized single-page design, lightning-fast deployment, mobile responsiveness, and basic SEO setup to ensure high visibility.",
        icon: RiCodeSSlashLine,
      },
      {
        question: "What is the typical turnaround time?",
        answer: "Due to their focused nature, these pages typically have the fastest turnaround, usually delivered within **3-5 weeks** depending on content readiness.",
        icon: RiTruckLine,
      },
    ],
  },
  {
    id: 12,
    title: "Web Solutions (SaaS/Custom Apps)",
    shortDescription: "Building scalable, bespoke software applications for internal and external use.",
    pricing: {
      originalPrice: "₹3,00,000+",
      discountedPrice: "Custom Quote",
      offer: "Retainer & SLA Contracts Available",
      buttonText: "Book Discovery Call",
    },
    techStack: ["Python/Django", "Serverless (GCP/Azure)", "Microservices", "Security Audit"],
    portfolioExamples: [
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        question: "What distinguishes a 'Web Solution' project?",
        answer: "This is for complex, non-standard needs—like automating a specific business process, building a user management portal, or creating a new platform (SaaS) from scratch.",
        icon: RiRocket2Line,
      },
      {
        question: "Do you handle third-party API integration?",
        answer: "Absolutely. Integration with CRMs, payment services, analytics tools, and legacy systems is a core part of our custom application development expertise.",
        icon: RiCodeSSlashLine,
      },
      {
        question: "What is the typical development lifecycle?",
        answer: "These projects follow a rigorous Agile methodology: detailed requirement gathering, MVP definition, iterative sprints, continuous testing, and phased deployment.",
        icon: RiShieldLine,
      },
    ],
  },
  {
    id: 13,
    title: "Custom Web Services",
    shortDescription: "Tailored services like API integration, maintenance, auditing, or migration.",
    pricing: {
      originalPrice: "Hourly Rate",
      discountedPrice: "Custom Packages",
      offer: "Dedicated developer hours",
      buttonText: "Hire a Specialist",
    },
    techStack: ["Any language/framework", "Legacy Code", "CI/CD Pipeline", "Cloud Migration"],
    portfolioExamples: [
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        question: "When should I choose 'Custom Web Services'?",
        answer: "When you have a specific, technical task that doesn't fit a standard package, such as fixing a critical bug, migrating a server, or integrating a new complex API.",
        icon: RiCodeSSlashLine,
      },
      {
        question: "What is the pricing model for these services?",
        answer: "We offer flexible models: **Fixed Price** for clearly defined tasks, **Hourly Rate** for ongoing support/maintenance, and **Retainer Contracts** for dedicated monthly capacity.",
        icon: RiWalletLine,
      },
      {
        question: "What is your typical response time?",
        answer: "For clients on a retainer or with an SLA (Service Level Agreement), critical issues have a guaranteed response time of **under 2 hours**.",
        icon: RiTruckLine,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* -------------------- 2. Helper Components ------------------- */
/* -------------------------------------------------------------------------- */

// Animated Counter Component
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
  const formatted = value >= 1000 ? `${Math.round(value / 1000)}k` : value;
  return <span>{formatted}{suffix}</span>;
};

// Accordion Item Component (Q&A)
const AccordionItem = ({ question, answer, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl border transition-all ${
        isOpen
          ? "border-cyan-500/50 bg-black/50 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          : "border-white/10 bg-black/30 hover:border-cyan-600/30"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <Icon className={`text-xl ${isOpen ? "text-cyan-400" : "text-gray-400"}`} />
          <span className="font-semibold">{question}</span>
        </div>
        {isOpen ? <RiArrowUpSLine className="text-2xl text-cyan-400" /> : <RiArrowDownSLine className="text-2xl text-white/50" />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="px-4 pb-4 text-gray-300 border-t border-white/5 pt-3"
        >
          {answer}
        </motion.div>
      )}
    </motion.div>
  );
};


/* -------------------------------------------------------------------------- */
/* -------------------- 3. Service Details Component (SKETCH UI) ------------------- */
/* -------------------------------------------------------------------------- */

const ServiceDetails = ({ service }) => {
    if (!service) return <div className="text-center text-gray-500 p-10">Select a Service</div>;

    return (
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* LEFT CARD: PORTFOLIO (Linear Gradient, Large Card) */}
        <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden min-h-[500px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-cyan-700/50 p-6"
            style={{ 
                // Premium Linear Gradient Background
                background: 'linear-gradient(135deg, rgba(28, 57, 135, 0.4), rgba(12, 12, 12, 0.9))' 
            }}
        >
            <h3 className="text-3xl font-extrabold text-cyan-300 mb-6 border-b border-cyan-300/30 pb-3">
                {service.title} Portfolio
            </h3>
            
            <div className="space-y-4">
                {service.portfolioExamples?.length > 0 ? (
                    service.portfolioExamples.slice(0, 1).map((img, index) => ( // Show only the first large example
                        <div key={index} className="rounded-xl overflow-hidden border border-white/10">
                            <motion.img
                                src={img}
                                alt={`Portfolio Example ${index + 1}`}
                                className="w-full h-auto object-cover aspect-video"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center h-48 text-gray-400">
                        <p>No featured portfolio. Contact us for a live demo!</p>
                    </div>
                )}
            </div>

            <div className="mt-8">
                 <h4 className="text-xl font-semibold mb-3 text-white">Core Tech Stack</h4>
                 <p className="text-gray-300 text-sm">{service.techStack?.join(" • ")}</p>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} className="mt-8">
                <Link to={"https://wa.me/+919752505639"} target="_blank">
                    <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-bold transition-colors">
                        View Full Case Studies <RiArrowRightLine className="inline ml-1" />
                    </button>
                </Link>
            </motion.div>
        </motion.div>


        {/* RIGHT CARD: DESCRIPTION (Pricing, Offers, Q&A) */}
        <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="bg-black/70 p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-6"
        >
             <h3 className="text-2xl font-bold text-white mb-4">Service Description & Details</h3>
            
            {/* TOP: PRICE AND OFFERS CARD */}
            <motion.div 
                whileHover={{ scale: 1.02, y: -5 }} 
                transition={{ type: 'spring', stiffness: 300 }}
                className="p-5 bg-white/5 border border-cyan-500/30 rounded-xl shadow-inner shadow-cyan-900/50"
            >
                <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-400">
                        Service Price (Discounted Offer)
                    </div>
                    <div className="text-right">
                        <div className="text-lg line-through text-gray-500">{service.pricing?.originalPrice}</div>
                        <div className="text-4xl font-extrabold text-cyan-400">{service.pricing?.discountedPrice}</div>
                    </div>
                </div>
                <div className="text-center text-sm font-semibold text-red-400 mt-3 border-t border-white/10 pt-3">
                    {service.pricing?.offer}
                </div>
            </motion.div>


            {/* Q&A / DESCRIPTION ACCORDION */}
            <div className="space-y-4 pt-4">
                <h4 className="text-xl font-semibold text-white">In-Depth Q&A: Unlock the Value</h4>
                {service.details?.map((item, index) => (
                    <AccordionItem key={index} {...item} />
                ))}
            </div>

             {/* Bottom Call to Action */}
            <div className="mt-8 text-center">
                <Link to={"https://wa.me/+919752505639"} target="_blank">
                    <motion.button whileHover={{ scale: 1.05 }} className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-bold transition-colors">
                        {service.pricing?.buttonText || "Request Quote"} <RiArrowRightLine className="inline ml-1" />
                    </motion.button>
                </Link>
            </div>
        </motion.div>
      </motion.div>
    );
  };


/* -------------------------------------------------------------------------- */
/* -------------------------- 4. Main Services Component ------------------------- */
/* -------------------------------------------------------------------------- */

const Services = () => {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(allServicesData[0]);
  const heroRef = useRef(null);
  
  const pricingPlans = [
    // Your original pricing plans for the dedicated pricing section
    { title: "Standard Plan", discountedPrice: "₹49,999", originalPrice: "₹54,999", gst: "18% GST ₹ 8999", features: ["8 pages Website", "1 Year Free Domain", "1 Year Hosting", "Dynamic Website (Premium Design)", "Free SSL", "5 Email ids", "SEO Friendly", "Responsive"], buttonText: "Call Now" },
    { title: "Premium Plan", discountedPrice: "₹99,999", originalPrice: "₹109,999", gst: "18% GST ₹17999", features: ["12 pages", "Admin Access", "Payment Gateway", "Unlimited Media Upload", "10 Email ids", "24/7 Hosting Support"], buttonText: "Call Now" },
    { title: "Custom Plan", discountedPrice: "Custom", originalPrice: "₹???", gst: "18% GST Applicable", features: ["Tailored to requirement", "Priority support", "SLA & Retainers"], buttonText: "Discuss" },
  ];


  useEffect(() => {
    // Set the rich service data locally
    setServices(allServicesData);
    setActiveService(allServicesData[0]);
    // Note: If you want to re-integrate API fetching later, modify this useEffect block.
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#080808] text-white">
      
      {/* HERO SECTION (Cinematic Video Background) */}
      <div ref={heroRef} className="relative h-[78vh] md:h-[72vh] overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover opacity-30" autoPlay loop muted>
          <source src={serviceVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center">
          <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-cyan-300">
                Services that deliver **Award-Winning** results.
              </h1>
              <p className="max-w-2xl text-gray-300">
                Leverage our product-first approach to accelerate your roadmap. We craft elegant experiences, reliable systems, and growth loops that scale.
              </p>

              <div className="flex gap-3 flex-wrap">
                <Link to={"https://wa.me/+919752505639"} target="_blank" className="inline-block">
                  <motion.button whileHover={{ scale: 1.03 }} className="bg-cyan-600 px-6 py-3 rounded-full shadow-lg font-semibold">
                    Request Free Consultation
                  </motion.button>
                </Link>

                <motion.a whileHover={{ scale: 1.03 }} href="#plans" className="inline-block">
                  <button className="bg-white/6 px-6 py-3 rounded-full border border-white/8">See Standard Plans</button>
                </motion.a>
              </div>
          </motion.div>
        </div>
      </div>

      {/* DYNAMIC SERVICE SECTION (Sketch Layout Implementation) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-20">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-10 text-center">
            Explore Our Comprehensive Services
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            
            {/* 1. Service List (Left Sidebar) */}
            <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="space-y-3 p-4 bg-black/50 rounded-xl border border-white/10 h-min sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Select a Service:</h3>
              {services.map((service, idx) => (
                <motion.button
                  key={service.id ?? idx}
                  onClick={() => setActiveService(service)}
                  whileHover={{ x: 5 }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 border ${
                    activeService?.id === service.id
                      ? "bg-cyan-600/40 border-cyan-500 text-white shadow-xl"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <span className="font-semibold block">{service.title}</span>
                  <span className="text-sm block text-gray-400">{service.shortDescription}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* 2. Service Details (Main Content Area) */}
            <ServiceDetails service={activeService} />
          </div>
      </div>

      {/* Pricing / Plans (Your original pricing section) */}
      <section id="plans" className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Standard Project Pricing
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className={`rounded-2xl overflow-hidden border ${idx === 1 ? "border-cyan-400 bg-cyan-900/20" : "border-white/8 bg-black/70"} p-6 shadow-lg`}
            >
              <div className="text-center mb-4">
                <div className="text-sm text-gray-300">{plan.title}</div>
                <div className="text-lg line-through text-gray-400">{plan.originalPrice}</div>
                <div className="text-3xl font-bold mt-2 text-cyan-400">{plan.discountedPrice}</div>
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
                  <button className="bg-[#1c3987] px-6 py-3 rounded-full hover:bg-cyan-700 transition-colors">{plan.buttonText}</button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Small metrics strip */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="bg-black/80 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center border border-cyan-800/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400"><AnimatedCounter from={0} to={4} suffix="+" /></div>
            <div className="text-gray-300">Years In Business</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400"><AnimatedCounter from={0} to={850} suffix="k" /></div>
            <div className="text-gray-300">Users Reached</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400"><AnimatedCounter from={0} to={10} suffix="%" /></div>
            <div className="text-gray-300">Avg Conversion Lift</div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;