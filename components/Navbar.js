import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">URL Shortener</Link>
        <div className="space-x-4">
          <Link href="/about" className="text-gray-300 hover:text-white">About</Link>
          <Link href="/privacy" className="text-gray-300 hover:text-white">Privacy</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
