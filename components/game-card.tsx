import Image from "next/image"
import type { Game } from "@/lib/types"

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <a
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{ borderTop: `3px solid ${game.colorVibrant}` }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={game.assets.cover || "/placeholder.svg"}
          alt={`${game.name.en} - Free HTML5 Game`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{game.name.en}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 h-10">{game.description.en}</p>
        <div className="mt-3 flex justify-between items-center">
          {game.categories.en.length > 0 && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              {game.categories.en[0]}
            </span>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">{(game.gamePlays / 1000000).toFixed(1)}M plays</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  )
}
