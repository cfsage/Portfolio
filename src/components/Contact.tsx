import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from './animations/ScrollReveal';

export const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="relative z-10 py-20 bg-black" id="contact">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Get In <span className="text-blue-500">Touch</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Talk</h3>
              <p className="text-zinc-400 mb-8">
                Have a project in mind? Looking to partner or work together? Reach out
                through the form and I'll get back to you in the next 24-48 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Email</h4>
                    <p className="text-zinc-400">yadavbiplove22@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Phone</h4>
                    <p className="text-zinc-400">+977 9800000000</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Location</h4>
                    <p className="text-zinc-400">Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: 'name', label: 'Name', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'subject', label: 'Subject', type: 'text' },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <input
                    type={field.type}
                    name={field.name}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={handleChange}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-colors peer"
                    placeholder={field.label}
                    required
                  />
                  <label
                    className={`absolute left-4 transition-all duration-200 ${
                      focused === field.name || formState[field.name as keyof typeof formState]
                        ? '-top-2.5 text-sm text-blue-500 bg-black px-2'
                        : 'top-3 text-zinc-500'
                    }`}
                  >
                    {field.label}
                  </label>
                </div>
              ))}

              <div className="relative">
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  rows={4}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-colors peer"
                  placeholder="Message"
                  required
                />
                <label
                  className={`absolute left-4 transition-all duration-200 ${
                    focused === 'message' || formState.message
                      ? '-top-2.5 text-sm text-blue-500 bg-black px-2'
                      : 'top-3 text-zinc-500'
                  }`}
                >
                  Message
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                type="submit"
              >
                Send Message
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}; 