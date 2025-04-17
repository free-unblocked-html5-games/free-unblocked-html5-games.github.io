import type { Game } from "@/lib/types"
import Link from "next/link"
import GameCard from "./game-card"

interface CategorySectionProps {
  games: Game[]
  category: string
}

export default function CategorySection({ games, category }: CategorySectionProps) {
  // Filter games by category
  const filteredGames = games.filter((game) => game.categories.en.includes(category)).slice(0, 4) // Show only 4 games per category

  if (filteredGames.length === 0) return null

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{category} Games</h2>
        <Link
          href={`/category/${category.toLowerCase()}`}
          className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <GameCard key={game.code} game={game} />
        ))}
      </div>
    </div>
  )
}
