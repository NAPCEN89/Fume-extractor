'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Factory, 
  ChevronDown, 
  Loader2,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const products = [
  'Wet Scrubbers',
  'Dust Collectors',
  'Downdraft Tables',
  'Air Filtration Systems',
  'Mist Collectors',
  'Fume Extractors',
  'General Inquiry / Other',
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    product: '',
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.mobile || !formData.product) {
      setStatus('Please fill Email, Mobile & Product');
      setTimeout(() => setStatus(''), 5000);
      return;
    }

    setIsSubmitting(true);
    setStatus('Sending your request...');

    // Web3Forms Configuration updated with your new access key
    const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "233963d2-f4b0-4f25-9a2f-bf7e151ac018";

    const payload = {
      access_key: ACCESS_KEY,
      subject: `New Quote Request: ${formData.product} — NAPCEN`,
      from_name: formData.name || "NAPCEN Lead",
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      product: formData.product,
      message: formData.message,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Accept: "application/json" 
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setStatus('Thank you! We will contact you soon.');
        setFormData({ product: '', name: '', email: '', mobile: '', message: '' });
      } else {
        console.error("Web3Forms Response Error:", result);
        setStatus('Submission failed. Please try again or call us.');
      }
    } catch (error) {
      console.error("Network Exception:", error);
      setStatus('Submission failed. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(''), 6000);
    }
  };

  const isSuccess = status.includes('Thank');

  return (
    <main className="min-h-screen bg-white text-gray-900 pt-10 md:pt-14 px-4 sm:px-6 lg:px-8 flex flex-col relative overflow-hidden">
      {/* Back Link */}
      <div className="max-w-2xl mx-auto w-full pt-4 pb-2">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-blue hover:underline transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[800px] h-[800px] bg-primary-blue/5 blur-[160px] rounded-full" />
      </div>

      <div className="flex-1 flex items-center justify-center py-8 md:py-12">
        <div className="w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 md:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-primary-blue/80 to-primary-green mb-4">
              Request a Quote
            </h1>
            <p className="text-text-muted text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Share your requirements — get expert guidance and customized pricing from NAPCEN
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white border border-primary-blue/10 rounded-3xl p-8 sm:p-10 md:p-12 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-primary-blue mb-3">
                  Interested In *
                </label>
                <div className="relative">
                  <Factory className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-blue" />
                  <select
                    name="product"
                    required
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full bg-bg-light border border-primary-blue/20 rounded-2xl pl-12 pr-10 py-4 text-text-main text-base focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a product</option>
                    {products.map((p) => (
                      <option key={p} value={p} className="bg-white">{p}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-blue pointer-events-none" />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-primary-blue mb-3">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-blue" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-bg-light border border-primary-blue/20 rounded-2xl pl-12 pr-4 py-4 text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/20 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-primary-blue mb-3">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-blue" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full bg-bg-light border border-primary-blue/20 rounded-2xl pl-12 pr-4 py-4 text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/20 transition-all"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-primary-blue mb-3">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-blue" />
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-bg-light border border-primary-blue/20 rounded-2xl pl-12 pr-4 py-4 text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/20 transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-primary-blue mb-3">
                  Your Requirements
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your project requirements..."
                  className="w-full bg-bg-light border border-primary-blue/20 rounded-2xl px-4 py-4 text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/20 transition-all resize-none"
                />
              </div>

              {/* Submit Button with Loading State */}
              <motion.button
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary-blue hover:bg-primary-blue/90 text-white font-black uppercase tracking-wider py-5 rounded-2xl text-lg shadow-lg hover:shadow-primary-blue/30 transition-all duration-300 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </motion.button>

              {/* Status Message */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-5 rounded-2xl text-center font-bold text-base flex items-center justify-center gap-3 ${
                    isSuccess
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-red-500/10 text-red-500 border border-red-500/30'
                  }`}
                >
                  {isSuccess ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                  {status}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
