import { LoadSpinner } from './LoadSpinner'
import { useGames } from './hooks/useGames'
import { GameListItem } from './GameListItem'

function GamesListContainer({ children }) {
  return (
    <div className="games-list h-full w-full flex flex-col justify-start items-center gap-8">
      {children}
    </div>
  )
}

export function GamesList({ editGame }) {
  const { isLoading, games, removeGame } = useGames()

  if (isLoading) {
    return (
      <GamesListContainer>
        <LoadSpinner />
      </GamesListContainer>
    )
  }

  return (
    <GamesListContainer>
      {games.map((game) => (
        <GameListItem
          onDeleteClick={() => removeGame(game.id)}
          onEdit={() => editGame(game)}
          game={game}
          key={game.id}
        />
      ))}
    </GamesListContainer>
  )
}
