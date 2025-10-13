'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // reCAPTCHA v3 execution
    const token = await grecaptcha.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
      { action: 'submit' }
    );

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, token }),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
    } else {
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <section className="relative bg-gray-900 text-stone-200 py-8 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-5xl max-w-6xl text-white mx-auto p-6 font-bold text-center">Contact us today</h2>
        <div className="bg-black backdrop-blur-md rounded-2xl shadow-lg p-8 sm:p-12">
          {success ? (
            <p className="text-green-400 text-center text-lg">
              ✅ Thanks! Your message has been sent.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="text-black w-full px-4 py-3 rounded-lg bg-slate-300 border border-stone-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-black">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="text- black w-full px-4 py-3 rounded-lg bg-slate-300 border border-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="Your Phone"
                  className="w-full px-4 py-3 rounded-lg bg-slate-300 border border-stone-600 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-300 text-black border border-stone-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>

              {error && <p className="text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 cursor-pointer hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
