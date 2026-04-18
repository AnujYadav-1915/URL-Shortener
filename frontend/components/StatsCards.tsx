const stats = [
  { label: "Links Created", value: "10M+" },
  { label: "Clicks Tracked", value: "1B+" },
  { label: "Active Users", value: "100K+" },
];

export default function StatsCards() {
  return (
    <section className="w-full max-w-4xl mx-auto py-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <div className="text-3xl font-extrabold text-white mb-2">{s.value}</div>
            <div className="text-neutral-400 text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
