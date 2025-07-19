import { tgTheme } from './tgUtils'
import { DangerButton } from './DangerButton'
import { SuccessButton } from './SuccessButton'
import { FiCheckCircle } from 'react-icons/fi'
import { FiMinusCircle } from 'react-icons/fi'

export function PlayerListItem({ player, onDeleteClick, onApproveClick }) {
  const bgClass = tgTheme == 'light' ? 'bg-black/5' : 'bg-white/5'

  return (
    <div
      className={`flex flex-col flex-nowrap gap-2 w-full p-4 rounded-4xl ${bgClass}`}
    >
      <div
        className={`flex flex-row flex-nowrap justify-start items-center gap-2`}
      >
        <img
          src={player.tgAvatar}
          className="w-[50px] h-[50px] rounded-[25px]"
        />

        <div className="text-lg font-mono">{player.name}</div>
      </div>

      <div className="text-sm px-2 pt-2">
        <div>
          <span className="opacity-60">Telegram ID:</span> {player.tgId}
        </div>
        <div>
          <span className="opacity-60">Telegram Username:</span>{' '}
          {player.tgUsername == 'undefined' ? 'Не указан' : player.tgUsername}
        </div>
      </div>

      {(!player.isApproved || !player.isAdmin) && (
        <div className="flex flex-row flex-nowrap justify-end gap-2 mt-2">
          {!player.isApproved && (
            <SuccessButton onClick={onApproveClick}>
              <FiCheckCircle />
              Одобрить
            </SuccessButton>
          )}

          {!player.isAdmin && (
            <DangerButton onClick={onDeleteClick}>
              <FiMinusCircle />
              Удалить
            </DangerButton>
          )}
        </div>
      )}
    </div>
  )
}
