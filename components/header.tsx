import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-purple-700">
            FreeGamesHub
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
              Home
            </Link>
            <Link href="/#games" className="text-gray-700 hover:text-purple-600 font-medium">
              Games
            </Link>
            <Link href="/#categories" className="text-gray-700 hover:text-purple-600 font-medium">
              Categories
            </Link>
            <Link href="/#about" className="text-gray-700 hover:text-purple-600 font-medium">
              About
            </Link>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
