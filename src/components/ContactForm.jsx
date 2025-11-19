import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    subject: '',
    category: 'JobFinder',
    organization: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requestData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      category: formData.category,
      contactNumber: formData.contactNumber,
      status: 'Pending',
      message: formData.message,
    };

    try {
      const response = await fetch('https://ecoavenstra-be.onrender.com/api/v1/admin/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          subject: '',
          category: 'JobFinder',
          organization: '',
          message: '',
        });
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex items-center justify-center w-full min-h-screen text-green-500 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        className="bg-black border border-lime-400 p-8 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.6)] w-full max-w-lg"
        onSubmit={handleSubmit}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-lime-400 text-center drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]"
          variants={fadeInUp}
        >
          Contact Us
        </motion.h2>

        {['name','email','contactNumber','subject'].map((field) => (
          <motion.div className="mb-4" key={field} variants={fadeInUp}>
            <label
              className="block text-lime-300 text-sm font-bold mb-2 capitalize"
              htmlFor={field}
            >
              {field === 'contactNumber' ? 'Your Contact Number' : field}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="bg-black border border-lime-400 rounded w-full py-2 px-3 text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </motion.div>
        ))}

        <motion.div className="mb-4" variants={fadeInUp}>
          <label className="block text-lime-300 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-black border border-lime-400 rounded w-full py-2 px-3 text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
          >
            <option value="JobFinder">JobFinder</option>
            <option value="Organization">Organization</option>
          </select>
        </motion.div>

        {formData.category === 'Organization' && (
          <motion.div className="mb-4" variants={fadeInUp}>
            <label className="block text-lime-300 text-sm font-bold mb-2" htmlFor="organization">
              Organization Name
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="bg-black border border-lime-400 rounded w-full py-2 px-3 text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </motion.div>
        )}

        <motion.div className="mb-4" variants={fadeInUp}>
          <label className="block text-green-300 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="bg-black border border-green-400 rounded w-full py-2 px-3 text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            rows="4"
          ></textarea>
        </motion.div>

        <motion.div className="flex items-center justify-center mt-6" variants={fadeInUp}>
          <motion.button
            type="submit"
            className=" hover:bg-lime-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-lime-300 transition flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.8)]"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(163,230,53,1)' }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? (
              <motion.div
                className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"
              />
            ) : (
              'Submit'
            )}
          </motion.button>
        </motion.div>

        {isSubmitted && (
          <motion.p
            className="text-green-400 text-center mt-4 font-semibold drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✅ Your enquiry has been submitted successfully!
          </motion.p>
        )}
      </motion.form>
    </motion.div>
  );
};

export default ContactForm;
