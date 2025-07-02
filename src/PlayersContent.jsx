import { ContentContainer } from './ContentContainer'
import { ContentInnerContainer } from './ContentInnerContainer'
import { ContentHeading } from './ContentHeading'

import { fetchPlayersList, approvePlayer, deletePlayer } from './api'
import { useEffect, useState } from 'react'

import { tgTheme } from './tgUtils'
import { LoadSpinner } from './LoadSpinner'
import { DangerButton } from './DangerButton'
import { SuccessButton } from './SuccessButton'
import { LoaderContainer } from './LoaderContainer'

export function PlayerListItem({
  player,
  isAdmin,
  onDeleteClick,
  onApproveClick,
}) {
  const bgClass = tgTheme == 'light' ? 'bg-black/5' : 'bg-white/5'
  const borderClass = tgTheme == 'light' ? 'border-black/5' : 'border-white/5'

  return (
    <div className="flex flex-col flex-nowrap gap-2">
      <div
        className={`flex flex-row flex-nowrap justify-start items-center gap-2 rounded-4xl ${bgClass}`}
      >
        <img
          src={player.tgAvatar}
          className="w-[50px] h-[50px] rounded-[25px]"
        />

        <div>{player.name}</div>
      </div>
      {isAdmin && (
        <div
          className={`flex flex-row flex-nowrap justify-end gap-2 pr-4 pb-3 border-b-1 ${borderClass}`}
        >
          {!player.isApproved && (
            <SuccessButton onClick={onApproveClick}>Одобрить</SuccessButton>
          )}
          {!player.isAdmin && (
            <DangerButton onClick={onDeleteClick}>Удалить</DangerButton>
          )}
        </div>
      )}
    </div>
  )
}

export function PlayersList({
  players,
  isAdmin,
  onDeleteClick,
  onApproveClick,
}) {
  return (
    <div className="h-full w-full flex flex-col flex-nowrap gap-3">
      {players.map((player) => (
        <PlayerListItem
          isAdmin={isAdmin}
          onDeleteClick={() => onDeleteClick(player.id)}
          onApproveClick={() => onApproveClick(player.id)}
          player={player}
          key={player.id}
        />
      ))}
    </div>
  )
}

export function PlayersContent({ isAdmin }) {
  const [players, setPlayers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getPlayers = async () => {
    setIsLoading(true)
    const fetchedPlayers = await fetchPlayersList()
    setPlayers(fetchedPlayers)
    setIsLoading(false)
  }

  const onDeleteClick = async (userId) => {
    const successDelete = await deletePlayer(userId)
    if (successDelete) {
      await getPlayers()
    }
  }

  const onApproveClick = async (userId) => {
    const successApprove = await approvePlayer(userId)
    if (successApprove) {
      await getPlayers()
    }
  }

  useEffect(() => {
    getPlayers()
  }, [])

  return (
    <ContentContainer>
      <ContentHeading>Игроки</ContentHeading>
      <ContentInnerContainer>
        {isLoading ? (
          <LoaderContainer>
            <LoadSpinner />
          </LoaderContainer>
        ) : (
          <PlayersList
            players={players}
            isAdmin={isAdmin}
            onDeleteClick={onDeleteClick}
            onApproveClick={onApproveClick}
          />
        )}
      </ContentInnerContainer>
    </ContentContainer>
  )
}
