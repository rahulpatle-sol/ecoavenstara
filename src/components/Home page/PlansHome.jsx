import React, { useState } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Web Development',
    description: 'Scalable, responsive websites tailored to your brand and business goals.',
    pricing: { BASIC: '₹49,999', PREMIUM: '₹99,999', CUSTOMIZE: 'As per requirement' },
    includedInPlans: ['BASIC', 'PREMIUM', 'CUSTOMIZE'],
    offer: '🎁 Free SEO audit with PREMIUM',
  },
  {
    name: 'Landing Page Development',
    description: 'High-converting landing pages for campaigns and products.',
    pricing: { BASIC: '₹24,999', PREMIUM: '₹49,999', CUSTOMIZE: 'As per requirement' },
    includedInPlans: ['BASIC', 'PREMIUM', 'CUSTOMIZE'],
    offer: '🎁 10% off for startups',
  },
  {
    name: 'Web Solutions',
    description: 'Custom dashboards, portals, and integrations.',
    pricing: { PREMIUM: '₹1,19,999', CUSTOMIZE: 'As per requirement' },
    includedInPlans: ['PREMIUM', 'CUSTOMIZE'],
    offer: '🎁 Free consultation call',
  },
  {
    name: 'Custom Web Applications',
    description: 'Tailored apps for unique workflows and business logic.',
    pricing: { PREMIUM: '₹1,49,999', CUSTOMIZE: 'As per requirement' },
    includedInPlans: ['PREMIUM', 'CUSTOMIZE'],
    offer: '🎁 Early bird discount: ₹10,000 off',
  },
  {
    name: 'eCommerce Development',
    description: 'Full-stack eCommerce platforms with payment and inventory.',
    pricing: { BASIC: '₹99,999', PREMIUM: '₹1,99,999', CUSTOMIZE: 'As per requirement' },
    includedInPlans: ['BASIC', 'PREMIUM', 'CUSTOMIZE'],
    offer: '🎁 Free payment gateway integration',
  },
];

const PlansHome = () => {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <section className="bg-gradient-to-b from-[#0f0f0f] to-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        
        {/* Left Side - Card Container */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="col-span-1"
        >
          <div className="bg-gray-900/60 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-md shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Service</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFeature(feature)}
                  className={`cursor-pointer p-4 rounded-xl border border-cyan-500/20 bg-gray-800/50 
                  backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg 
                  hover:shadow-cyan-500/10 ${selectedFeature.name === feature.name ? 'border-cyan-500' : ''}`}
                >
                  <h3 className="text-lg font-semibold text-cyan-300">{feature.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{feature.description.slice(0, 60)}...</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Wallet UI */}
        <motion.div
          key={selectedFeature.name}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="col-span-2 bg-gray-900/80 p-10 rounded-2xl border border-cyan-500/20 backdrop-blur-md shadow-x h-full "
        >
          <h4 className="text-cyan-400 text-sm font-semibold uppercase mb-2">Plan Details</h4>
          <h3 className="text-3xl font-bold text-white mb-4">{selectedFeature.name}</h3>
          <p className="text-gray-300 text-[16px] mb-6">{selectedFeature.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {['BASIC', 'PREMIUM', 'CUSTOMIZE'].map((plan) => (
              <div
                key={plan}
                className={`p-4 rounded-lg border ${
                  selectedFeature.includedInPlans.includes(plan)
                    ? 'border-cyan-500/30 bg-gray-800/50'
                    : 'border-gray-700 bg-gray-800/30 opacity-50'
                }`}
              >
                <h5 className="text-cyan-300 font-semibold text-lg mb-2">{plan}</h5>
                <p className="text-white font-bold">
                  {selectedFeature.pricing[plan] || 'Not Available'}
                </p>
              </div>
            ))}
          </div>

          {selectedFeature.offer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 bg-gradient-to-r from-cyan-600 to-emerald-600 text-black rounded-lg font-semibold shadow-md"
            >
              {selectedFeature.offer}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PlansHome;
