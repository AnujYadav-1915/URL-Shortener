import Image from "next/image";

export default function ProductShowcase() {
  return (
    <section className="w-full max-w-6xl mx-auto py-20 flex flex-col items-center">
      <h2 className="text-3xl font-bold neon mb-10 text-center">See NeonShort in Action</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Dashboard Preview */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <Image src="/showcase/dashboard.png" alt="Dashboard Preview" width={480} height={280} className="rounded-xl border border-neutral-800" />
          <div className="mt-4 text-lg text-neutral-300 text-center">Powerful dashboard to manage links, analytics, and QR codes.</div>
        </div>
        {/* Analytics Graph & Links Table */}
        <div className="flex flex-col gap-8">
          <div className="bg-neutral-900 rounded-2xl shadow p-6 flex flex-col items-center">
            <Image src="/showcase/analytics.png" alt="Analytics Graph" width={400} height={160} className="rounded border border-neutral-800" />
            <div className="mt-2 text-neutral-400 text-center text-sm">Track clicks, referrers, and trends in real time.</div>
          </div>
          <div className="bg-neutral-900 rounded-2xl shadow p-6 flex flex-col items-center">
            <Image src="/showcase/links-table.png" alt="Links Table" width={400} height={120} className="rounded border border-neutral-800" />
            <div className="mt-2 text-neutral-400 text-center text-sm">Manage all your branded links in one place.</div>
          </div>
          <div className="bg-neutral-900 rounded-2xl shadow p-6 flex flex-col items-center">
            <Image src="/showcase/qr.png" alt="QR Generator UI" width={120} height={120} className="rounded border border-neutral-800" />
            <div className="mt-2 text-neutral-400 text-center text-sm">Instant QR code generator for every link.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
