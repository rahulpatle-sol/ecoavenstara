import React from "react";
import { motion } from "framer-motion";
import instagram from "../../assets/instagram.png";
import facebook from "../../assets/facebook.png";
import linkedin from "../../assets/linkedIn.png";
import whatsapp from "../../assets/whatsapp.png";

const icons = [
  { src: instagram, alt: "instagram", link: "https://instagram.com" },
  { src: facebook, alt: "facebook", link: "https://www.facebook.com/Ecoavenstra/" },
  { src: linkedin, alt: "linkedin", link: "https://www.linkedin.com/company/ecoavenstra-hr-infotech-pvt-ltd/" },
  { src: whatsapp, alt: "whatsapp", link: "https://wa.me/+919752505639" },
];

const Social = () => {
  return (
    <div className="flex md:flex-col flex-row gap-6 px-3 md:pt-32">
      {icons.map((icon, i) => (
        <motion.a
          key={i}
          href={icon.link}
          target="_blank"
          rel="noopener noreferrer"
          drag
          dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 flex items-center justify-center rounded-full 
                     bg-white/10 backdrop-blur-md border border-white/20 shadow-lg cursor-grab active:cursor-grabbing"
        >
          <img src={icon.src} alt={icon.alt} className="w-6 h-6 object-contain" />
        </motion.a>
      ))}
    </div>
  );
};

export default Social;
