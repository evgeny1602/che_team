import { ContentHeading } from './ContentHeading'
import { NewGameForm } from './NewGameForm'
import { GamesList } from './GamesList'
import { useState } from 'react'

export function GamesContent() {
  const [currentGame, setCurrentGame] = useState(null)

  return (
    <>
      <ContentHeading>Игры</ContentHeading>

      <div className="flex flex-col flex-nowrap gap-8">
        {window.isAdmin && <NewGameForm game={currentGame} />}

        <GamesList editGame={(game) => setCurrentGame(game)} />
      </div>
    </>
  )
}
