import { LoadSpinner } from './LoadSpinner'
import { useGames } from './hooks/useGames'
import { GameListItem } from './GameListItem'

export function GamesList() {
  const { addGame, isLoading, games, removeGame } = useGames()

  return (
    <div className="games-list h-full w-full flex flex-col justify-start items-center gap-4">
      {isLoading && <LoadSpinner />}

      {!isLoading &&
        games.map((game) => (
          <GameListItem
            onDeleteClick={() => removeGame(game.id)}
            game={game}
            key={game.id}
          />
        ))}
    </div>
  )
}
