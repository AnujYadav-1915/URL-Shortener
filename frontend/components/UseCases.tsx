import { FaBullhorn, FaShoppingBag, FaHashtag } from "react-icons/fa";

const useCases = [
  {
    icon: <FaBullhorn size={28} className="text-blue-400" />,
    title: "Marketing",
    desc: "Boost campaigns with trackable, branded links."
  },
  {
    icon: <FaShoppingBag size={28} className="text-purple-400" />,
    title: "Retail",
    desc: "Drive offline-to-online with QR codes and analytics."
  },
  {
    icon: <FaHashtag size={28} className="text-pink-400" />,
    title: "Social Media",
    desc: "Share more, track more, grow your audience."
  }
];

export default function UseCases() {
  return (
    <section className="w-full max-w-5xl mx-auto py-16">
      <h2 className="text-3xl font-bold neon mb-10 text-center">Perfect for Every Industry</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {useCases.map((uc, i) => (
          <div key={i} className="bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
            <div className="mb-4">{uc.icon}</div>
            <div className="font-bold text-lg mb-2">{uc.title}</div>
            <div className="text-neutral-400 text-sm">{uc.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
