import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              CineVault
            </Link>
            <nav className="flex space-x-6">
              <Link href="/movies" className="text-gray-600 transition-colors hover:text-gray-900">
                Movies
              </Link>
              <Link href="/actors" className="text-gray-600 transition-colors hover:text-gray-900">
                Actors
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
