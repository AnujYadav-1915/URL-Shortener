import { ReactNode } from 'react';

export default function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="card flex flex-col items-center text-center gap-2 p-6 min-w-[220px]">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-xl font-bold mb-1">{title}</div>
      <div className="text-sm text-gray-300">{description}</div>
    </div>
  );
}
