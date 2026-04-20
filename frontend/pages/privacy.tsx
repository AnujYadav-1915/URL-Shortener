export default function Privacy() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold font-heading mb-12">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section className="card !p-8">
            <h2 className="text-xl font-bold mb-4">1. Data Collection</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">
              Vynkify collects only the data necessary for providing our URL shortening and analytics services. This includes your email address, links you create, and anonymized click analytics (country, device type, browser).
            </p>
          </section>

          <section className="card !p-8">
            <h2 className="text-xl font-bold mb-4">2. Use of Data</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">
              We use your data to provide analytics for your links and to ensure the security of our platform. We never sell your personal data to third parties.
            </p>
          </section>

          <section className="card !p-8">
            <h2 className="text-xl font-bold mb-4">3. Cookies</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">
              We use essential cookies to maintain your session and security. You can disable them in your browser settings, but some features may not work.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
