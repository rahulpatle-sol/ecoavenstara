import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import { motion } from 'framer-motion';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    status: 'Pending'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('https://ecoavenstra-be.onrender.com/api/v1/admin/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Thank you for your enquiry! We will get back to you soon.', type: 'success' });
        setFormData({ name: '', email: '', phone: '', message: '', status: 'Pending' });
      } else {
        setMessage({ text: data.message || 'Something went wrong. Please try again.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error. Please check your connection and try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { title: "Brand strengthening", icon: "🎯" },
    { title: "Endless business access", icon: "🌐" },
    { title: "Excellent market tools", icon: "🛠️" },
    { title: "Cost-effective Strategies", icon: "💰" },
  ];

  return (
    <section
      className="py-20 px-4 text-white relative bg-gradient-to-b from-[#0f0f0f] to-black"
      style={{
        backgroundImage: "url('https://ik.imagekit.io/y8vbhvt7s/New%20Folder/why-us.jpg?updatedAt=1762777389392')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 flex flex-col justify-center"
        >
          <h1 className="text-4xl lg:text-5xl font-bold">
            Why a <span className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-transparent bg-clip-text">website or app</span> is needed<br />
            for your business
          </h1>
          <div className="text-cyan-400 text-lg">
            <p>WE ARE HERE FOR YOU!</p>
            <p className="text-2xl font-semibold text-white">Get A Free Consultation</p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-center space-x-3 p-8 bg-gray-800/50 rounded-lg border border-cyan-500/20 
                backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg 
                hover:shadow-cyan-500/10"
              >
                <span className="text-2xl">{benefit.icon}</span>
                <span className="text-cyan-100 font-medium">{benefit.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900/80 p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { icon: FaUser, name: 'name', type: 'text', placeholder: 'Full Name' },
              { icon: FaPhone, name: 'phone', type: 'tel', placeholder: 'Contact Number' },
              { icon: FaEnvelope, name: 'email', type: 'email', placeholder: 'Email Address' },
            ].map(({ icon: Icon, name, type, placeholder }) => (
              <div key={name} className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg 
                  focus:outline-none focus:border-cyan-500 text-white placeholder-gray-400"
                />
              </div>
            ))}
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg 
                focus:outline-none focus:border-cyan-500 text-white placeholder-gray-400 min-h-[120px] resize-y"
              />
            </div>

            {/* Feedback Message */}
            {message.text && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-lg p-3 text-sm ${
                  message.type === 'success'
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-200 border border-red-500/30'
                }`}
              >
                {message.text}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold 
              rounded-lg transition-all duration-300 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-cyan-500/25'
              }`}
            >
              {loading ? 'Sending...' : 'Grab A Free Consultation With Us'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default EnquiryForm;
