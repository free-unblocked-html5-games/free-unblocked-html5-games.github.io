import type { Game, GameResponse } from "./types"

export async function getGames(): Promise<Game[]> {
  try {
    const response = await fetch("https://pub.gamezop.com/v3/games?id=10431", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`)
    }

    const data: GameResponse = await response.json()
    return data.games
  } catch (error) {
    console.error("Error fetching games:", error)
    return [] // Return empty array in case of error
  }
}
