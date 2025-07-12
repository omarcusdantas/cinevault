import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-20">
          <Link href="/" className="text-xl font-bold text-gray-900">
            <h1>CineVault</h1>
          </Link>
          <nav className="flex gap-4">
            <Link href="/movies" className="text-gray-600 transition-colors hover:text-gray-900">
              Movies
            </Link>
            <Link href="/actors" className="text-gray-600 transition-colors hover:text-gray-900">
              Actors
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
