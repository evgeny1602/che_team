import { PlayerListItem } from './PlayerListItem'
import { LoadSpinner } from './LoadSpinner'

import { usePlayers } from './hooks/usePlayers'

export function PlayersList() {
  const { players, isLoading, removePlayer, approvePlayer } = usePlayers()

  return (
    <div className="h-full w-full flex flex-col justify-start items-center gap-4">
      {isLoading && <LoadSpinner />}

      {!isLoading &&
        players.map((player) => (
          <PlayerListItem
            onDeleteClick={() => removePlayer(player.id)}
            onApproveClick={() => approvePlayer(player.id)}
            player={player}
            key={player.id}
          />
        ))}
    </div>
  )
}
