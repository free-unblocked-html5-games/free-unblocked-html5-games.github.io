import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FreeGamesHub</h3>
            <p className="text-gray-300">
              Your destination for free, unblocked HTML5 games. Play instantly in your browser!
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#games" className="text-gray-300 hover:text-white">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-gray-300 hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Game Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/action" className="text-gray-300 hover:text-white">
                  Action Games
                </Link>
              </li>
              <li>
                <Link href="/category/puzzle" className="text-gray-300 hover:text-white">
                  Puzzle Games
                </Link>
              </li>
              <li>
                <Link href="/category/arcade" className="text-gray-300 hover:text-white">
                  Arcade Games
                </Link>
              </li>
              <li>
                <Link href="/category/strategy" className="text-gray-300 hover:text-white">
                  Strategy Games
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} FreeGamesHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
