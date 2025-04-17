import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import GameGrid from "@/components/game-grid"
import Footer from "@/components/footer"
import { getGames } from "@/lib/api"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = decodeURIComponent(params.slug)
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${formattedCategory} Games | Free Unblocked HTML5 Games`,
    description: `Play free ${formattedCategory.toLowerCase()} games online. The best unblocked HTML5 ${formattedCategory.toLowerCase()} games that you can play directly in your browser.`,
    keywords: `${category} games, free games, unblocked games, html5 games, online games`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = decodeURIComponent(params.slug)
  const formattedCategory = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)

  const allGames = await getGames()

  // Filter games by category (case insensitive)
  const games = allGames.filter((game) =>
    game.categories.en.some((cat) => cat.toLowerCase() === categorySlug.toLowerCase()),
  )

  if (games.length === 0) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{formattedCategory} Games</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover and play the best free {formattedCategory.toLowerCase()} games directly in your browser.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">
            {games.length} {formattedCategory} Games to Play
          </h2>
          <Suspense fallback={<div className="text-center">Loading games...</div>}>
            <GameGrid games={games} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  )
}
