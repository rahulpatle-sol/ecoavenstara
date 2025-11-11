import React from "react";
import { motion } from "framer-motion";
import bgimage from "/src/assets/bg-about.png";
import logo1 from "/src/assets/Ecoavenstra_logo.png";
import logo2 from "/src/assets/Ecoavenstra1_logo.png";
import office from "/src/assets/office-img.png";
import WhyChooseUs from "./Home page/WhyChooseUs";
import Service_section from "./Home page/Service_section";
import EnquiryForm from "./Home page/EnquiryForm";

const stats = [
  { value: "4+", label: "Years In Business" },
  { value: "45+", label: "Happy Clients" },
  { value: "50+", label: "Projects Completed" },
  { value: "40k+", label: "Line of Code" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0f0f0f] text-white">
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-auto md:h-96 flex justify-center items-center py-8"
      >
        <img src={bgimage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-bold mb-4 flex justify-center gap-3">
            About <span className="text-blue-600">Us</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Unlock the potential of your concept, enterprise, aspiration, and bring it to life.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
            Who <span className="text-blue-700">We Are</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Ecoavenstra stands out as the ideal partner for your digital journey, offering a comprehensive range of web solutions and software solutions tailored to your business needs. From web design and development to e-commerce solutions, mobile apps, and digital marketing, we provide everything you need to establish a strong online presence. What sets us apart is our commitment to delivering affordable excellence—visually stunning and user-friendly websites that align with your brand identity, all without exceeding your budget. Backed by a team of skilled professionals, we focus on empowering businesses with innovative strategies and a customer-centric approach to unlock their full potential in the digital world. With a proven track record as a leading web design company in India, Ecoavenstra ensures end-to-end support, guiding you from concept to execution. Trust us to transform your online presence with the perfect blend of creativity, technology, and strategy.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#1c3987] text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Logo Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm mx-auto flex flex-col shadow-lg shadow-[#5e84bd] rounded-3xl bg-[#161616] gap-4 py-10"
        >
          <div className="text-white font-bold text-xl bg-[#1c3987] px-2 rounded-md self-center">
            Our Brand Identities
          </div>
          <img src={logo1} alt="Logo 1" className="w-48 md:w-60 mx-auto" />
          <img src={logo2} alt="Logo 2" className="w-48 md:w-60 mx-auto" />
          <div className="text-white font-bold text-center">By Ecoavenstra Hr Infotech Pvt.Ltd.</div>
        </motion.div>
      </main>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-black/90 rounded-2xl p-8 mx-4 md:mx-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="py-4"
            >
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <WhyChooseUs />
      <Service_section />

      {/* Mission & Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#101010] rounded-3xl mx-4 md:mx-20 p-6 md:p-12 my-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <img src={office} alt="Office" className="object-contain w-full max-w-2xl mx-auto" />
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-white mb-2">Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                Our mission is to help businesses of all sizes establish a strong and effective online presence through our innovative web development solutions.
              </p>
            </section>
            <section>
              <h2 className="text-3xl font-bold text-white mb-2">Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                Our vision is to become a leading web development company recognized for expertise, innovation, and commitment to client success.
              </p>
            </section>
          </div>
        </div>
      </motion.div>

      <EnquiryForm />

      {/* Consultation CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 md:px-16"
      >
        <div className="bg-[#151515] w-full rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-4 flex-grow">
              <h2 className="text-3xl font-bold text-white">Get Free Consultation Now!</h2>
              <p className="text-gray-400 text-lg">
                Let's create a powerful website that grows with your business.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a href="tel:+919752505639">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white border bg-[#1c3987] border-white hover:bg-green-600 hover:text-black transition-colors rounded-full px-8 py-4 text-lg"
                >
                  Consult Now
                </motion.button>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
