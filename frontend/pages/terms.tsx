export default function Terms() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold font-heading mb-12">Terms of Service</h1>
        
        <div className="space-y-8">
          <section className="card !p-8">
            <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">By using Vynkify, you agree to these terms. If you do not agree, please do not use our services.</p>
          </section>

          <section className="card !p-8">
            <h2 className="text-xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">Vynkify provides URL shortening, analytics tracking, QR code generation, and link management services. We reserve the right to modify or discontinue any feature at any time.</p>
          </section>

          <section className="card !p-8">
            <h2 className="text-xl font-bold mb-4">3. Prohibited Content</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">You may not use Vynkify for phishing, malware distribution, or illegal activities. We reserve the right to terminate accounts that violate these terms.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
