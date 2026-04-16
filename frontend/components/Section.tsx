import { ReactNode } from 'react';

export default function Section({ title, children, className = '' }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`w-full max-w-5xl mx-auto my-16 px-4 ${className}`}>
      {title && <h2 className="text-3xl font-bold neon mb-6 text-center">{title}</h2>}
      <div>{children}</div>
    </section>
  );
}
