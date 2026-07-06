import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Contact() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success('Message sent! We\'ll get back to you soon.');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <main className="min-h-screen py-24 px-4 relative">
      <div className="orb orb-purple w-[400px] h-[400px] -top-20 right-[-100px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-heading mb-3">Get in <span className="gradient-text">Touch</span></h1>
          <p className="text-[#a5a0c8]">Have a question or need help? We&apos;d love to hear from you.</p>
        </div>

        <form onSubmit={handleSubmit} className="card !p-8 flex flex-col gap-4">
          <div>
            <label className="text-xs text-[#a5a0c8] mb-1.5 block">Name</label>
            <input type="text" required placeholder="Your name" className="input-field" />
          </div>
          <div>
            <label className="text-xs text-[#a5a0c8] mb-1.5 block">Email</label>
            <input type="email" required placeholder="you@example.com" className="input-field" />
          </div>
          <div>
            <label className="text-xs text-[#a5a0c8] mb-1.5 block">Subject</label>
            <select className="input-field" required>
              <option value="">Select a topic</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="enterprise">Enterprise Plan</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-[#a5a0c8] mb-1.5 block">Message</label>
            <textarea required placeholder="How can we help you?" className="input-field !h-32 resize-none" />
          </div>
          <button type="submit" disabled={sending} className="btn-primary w-full !py-3.5 mt-2">
            {sending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : 'Send Message →'}
          </button>
        </form>

        <div className="text-center mt-8 space-y-2">
          <p className="text-sm text-[#a5a0c8]">
            Or email us directly at{' '}
            <a href="mailto:anuj11112003@gmail.com" className="text-[#7f5fff] hover:text-[#00e6ff] transition-colors font-medium">
              anuj11112003@gmail.com
            </a>
          </p>
          <p className="text-xs text-[#a5a0c8]/50">We typically respond within 24 hours</p>
        </div>
      </motion.div>
    </main>
  );
}
