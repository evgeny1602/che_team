import { tgTheme } from './tgUtils'
import { DangerButton } from './DangerButton'
import { FiCalendar } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'
import { FiMinusCircle } from 'react-icons/fi'
import { FiClock } from 'react-icons/fi'
import { FiThumbsUp } from 'react-icons/fi'
import { FiThumbsDown } from 'react-icons/fi'
import { NoButton } from './NoButton'
import { SuccessButton } from './SuccessButton'
import { usePlayerToEventsByEvent } from './hooks/usePlayerToEventsByEvent'

const formatDateTimeStr = (dateTimeStr) => {
  const [date_, time_] = dateTimeStr.split(' ')
  const [year_, month_, day_] = date_.split('-')
  const [hour_, minute_, second_] = time_.split(':')

  return (
    <span className="flex flex-row flex-now justify-start items-center gap-3">
      <span className="flex flex-row flex-now justify-start items-center gap-1">
        <FiCalendar />
        {day_}.{month_}.{year_}
      </span>
      <span className="flex flex-row flex-now justify-start items-center gap-1">
        <FiClock />
        {hour_}:{minute_}
      </span>
    </span>
  )
}

export function GameListItem({ game, onDeleteClick }) {
  const { players, addPlayer, removePlayer } = usePlayerToEventsByEvent(game.id)

  const isInGame = players.map((player) => player.id).includes(window.userId)
  const bgClass = tgTheme == 'light' ? 'bg-black/5' : 'bg-white/5'

  const onYesClick = async () => {
    await addPlayer(window.userId, [])
  }

  const onNoClick = async () => {
    await removePlayer(window.userId)
  }

  return (
    <div
      className={`flex flex-col flex-nowrap gap-2 w-full p-2 rounded-4xl ${bgClass}`}
    >
      <div
        className={`flex flex-row flex-nowrap justify-between items-center gap-2 rounded-4xl py-3 px-4 ${bgClass}`}
      >
        <span className={`text-sm`}>{formatDateTimeStr(game.dateTime)}</span>
        <span className="font-semibold">{game.name}</span>
        <span className="flex flex-row flex-nowrap justify-start items-center gap-1 text-sm">
          <FiUser />
          <span className="opacity-60">{game.minUsersCount} </span>
          <span className="font-semibold text-lg">{players.length}</span>
          <span className="opacity-60"> {game.maxUsersCount}</span>
        </span>
      </div>

      <div className={`flex flex-row flex-nowrap justify-end gap-2`}>
        {!isInGame && (
          <SuccessButton onClick={onYesClick}>
            <FiThumbsUp />
            Иду
          </SuccessButton>
        )}

        {isInGame && (
          <NoButton onClick={onNoClick}>
            <FiThumbsDown />
            Не иду
          </NoButton>
        )}

        {window.isAdmin && (
          <DangerButton onClick={onDeleteClick}>
            <FiMinusCircle />
            Удалить
          </DangerButton>
        )}
      </div>
    </div>
  )
}
