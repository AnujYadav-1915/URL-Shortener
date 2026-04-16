export default function Footer() {
  return (
    <footer className="w-full py-6 px-8 bg-[#232046] bg-opacity-90 text-center text-sm mt-16">
      <span>© {new Date().getFullYear()} NeonShort. All rights reserved. | <a href="/privacy" className="underline">Privacy Policy</a></span>
    </footer>
  );
}
