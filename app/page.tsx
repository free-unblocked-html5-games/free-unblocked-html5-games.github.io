import { Suspense } from "react"
import type { Metadata } from "next"
import Header from "@/components/header"
import GameGrid from "@/components/game-grid"
import CategorySection from "@/components/category-section"
import Footer from "@/components/footer"
import { getGames } from "@/lib/api"

export const metadata: Metadata = {
  title: "Free Unblocked HTML5 Games | Play Fun Games Online",
  description:
    "Discover and play the best free, unblocked HTML5 games. Enjoy fun games directly in your browser with no downloads required.",
  keywords: "free games, unblocked games, fun games, html5 games, online games, browser games",
  openGraph: {
    title: "Free Unblocked HTML5 Games | Play Fun Games Online",
    description:
      "Discover and play the best free, unblocked HTML5 games. Enjoy fun games directly in your browser with no downloads required.",
    type: "website",
    url: "https://yourdomain.com",
  },
}

export default async function Home() {
  const games = await getGames()

  // Extract unique categories
  const allCategories = new Set<string>()
  games.forEach((game) => {
    game.categories.en.forEach((category) => {
      allCategories.add(category)
    })
  })

  const categories = Array.from(allCategories).slice(0, 5) // Show top 5 categories

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Unblocked HTML5 Games</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Discover and play hundreds of fun, free HTML5 games directly in your browser. No downloads, no waiting -
            just instant gaming enjoyment!
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Games</h2>
          <Suspense fallback={<div className="text-center">Loading games...</div>}>
            <GameGrid games={games.slice(0, 12)} />
          </Suspense>

          <div className="mt-16" id="categories">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
            {categories.map((category) => (
              <CategorySection key={category} category={category} games={games} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Play Our Games?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-purple-600 text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Play</h3>
              <p>No downloads or installations required. Play instantly in your browser.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-purple-600 text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Unblocked</h3>
              <p>Access our games from anywhere, even from restricted networks.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-purple-600 text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fun for Everyone</h3>
              <p>Wide variety of games for all ages and preferences.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
