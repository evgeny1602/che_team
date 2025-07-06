import { tgTheme } from './tgUtils'
import { DangerButton } from './DangerButton'
import { SuccessButton } from './SuccessButton'
import { FiCheckCircle } from 'react-icons/fi'
import { FiMinusCircle } from 'react-icons/fi'

export function PlayerListItem({ player, onDeleteClick, onApproveClick }) {
  const bgClass = tgTheme == 'light' ? 'bg-black/5' : 'bg-white/5'
  const isButtonsVisible =
    window.isAdmin && (!player.isApproved || !player.isAdmin)
  const outerBgClass = isButtonsVisible ? `p-2 rounded-4xl ${bgClass}` : ''

  return (
    <div className={`flex flex-col flex-nowrap gap-3 w-full ${outerBgClass}`}>
      <div
        className={`flex flex-row flex-nowrap justify-start items-center gap-2 rounded-4xl ${bgClass}`}
      >
        <img
          src={player.tgAvatar}
          className="w-[50px] h-[50px] rounded-[25px]"
        />

        <div>{player.name}</div>
      </div>

      {isButtonsVisible && (
        <div className="flex flex-row flex-nowrap justify-end gap-3">
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
