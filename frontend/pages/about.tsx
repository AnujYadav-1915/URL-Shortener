import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 relative overflow-hidden">
      <div className="orb orb-purple w-[600px] h-[600px] -top-20 -right-20 opacity-30" />
      <div className="orb orb-cyan w-[400px] h-[400px] top-1/2 -left-20 opacity-20" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-6">About <span className="gradient-text">Vynkify</span></h1>
          <div className="card !p-8 sm:!p-12 space-y-6">
            <p className="text-lg text-[#a5a0c8] leading-relaxed text-left">
              Vynkify is a next-generation URL shortener built for modern teams, marketers, and creators who demand more than just short links.
            </p>
            <p className="text-lg text-[#a5a0c8] leading-relaxed text-left">
              We believe every link tells a story. Vynkify helps you track, manage, and optimize your links with powerful analytics, branded short URLs, QR codes, and a beautiful interface that makes link management a joy.
            </p>
            <p className="text-lg text-[#a5a0c8] leading-relaxed text-left">
              Vynkify is created by <span className="text-white font-semibold">Anuj Yadav</span> — a developer passionate about building beautiful, high-performance web applications.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
