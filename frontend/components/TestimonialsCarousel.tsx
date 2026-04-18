const testimonials = [
  {
    quote: "NeonShort made link management effortless for our team. The analytics are a game changer!",
    name: "Priya S.",
    role: "Growth Marketer",
    avatar: "/avatars/priya.png"
  },
  {
    quote: "The QR code feature is perfect for our retail campaigns. Highly recommended!",
    name: "Alex R.",
    role: "Retail Ops",
    avatar: "/avatars/alex.png"
  },
  {
    quote: "Best SaaS for branded links. Our social engagement is up 40%!",
    name: "Sam T.",
    role: "Social Media Lead",
    avatar: "/avatars/sam.png"
  }
];

export default function TestimonialsCarousel() {
  return (
    <section className="w-full max-w-3xl mx-auto py-16">
      <h2 className="text-3xl font-bold neon mb-10 text-center">What Our Users Say</h2>
      <div className="flex gap-8 overflow-x-auto pb-4">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-neutral-900 rounded-2xl shadow-lg p-8 min-w-[320px] flex flex-col items-center text-center">
            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-4 border-blue-500" />
            <div className="italic text-neutral-200 mb-4">“{t.quote}”</div>
            <div className="font-bold text-white">{t.name}</div>
            <div className="text-neutral-400 text-xs">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
