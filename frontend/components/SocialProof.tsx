import Image from "next/image";

export default function SocialProof() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 flex flex-col items-center">
      <div className="text-center text-neutral-400 text-sm mb-4">Trusted by teams at</div>
      <div className="flex flex-wrap justify-center gap-8 grayscale opacity-80">
        <Image src="/logos/google.svg" alt="Google" width={100} height={32} />
        <Image src="/logos/stripe.svg" alt="Stripe" width={100} height={32} />
        <Image src="/logos/shopify.svg" alt="Shopify" width={100} height={32} />
        <Image src="/logos/airbnb.svg" alt="Airbnb" width={100} height={32} />
        <Image src="/logos/uber.svg" alt="Uber" width={100} height={32} />
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-white">10M+</span>
          <span className="text-xs text-neutral-400">Links Created</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-white">1B+</span>
          <span className="text-xs text-neutral-400">Clicks Tracked</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-white">100K+</span>
          <span className="text-xs text-neutral-400">Active Users</span>
        </div>
      </div>
    </section>
  );
}
