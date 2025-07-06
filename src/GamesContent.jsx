import { ContentHeading } from './ContentHeading'
import { NewGameForm } from './NewGameForm'
import { GamesList } from './GamesList'

export function GamesContent() {
  return (
    <>
      <ContentHeading>Игры</ContentHeading>

      <div className="flex flex-col flex-nowrap gap-4">
        {window.isAdmin && <NewGameForm />}

        <GamesList />
      </div>
    </>
  )
}
