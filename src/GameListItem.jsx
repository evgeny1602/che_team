import { tgTheme } from './tgUtils'
import { DangerButton } from './DangerButton'
import { FiCalendar } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'
import { FiMinusCircle } from 'react-icons/fi'
import { FiClock } from 'react-icons/fi'
import { FiThumbsUp } from 'react-icons/fi'
import { FiThumbsDown } from 'react-icons/fi'
import { FiEdit2 } from 'react-icons/fi'
import { FiCreditCard } from 'react-icons/fi'
import { FiWatch } from 'react-icons/fi'
import { NoButton } from './NoButton'
import { SuccessButton } from './SuccessButton'
import { PrimaryButton } from './PrimaryButton'
import { usePlayerToEventsByEvent } from './hooks/usePlayerToEventsByEvent'
import { useEffect, useRef, useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import { DefaultButton } from './DefaultButton'
import { FiCheck } from 'react-icons/fi'
import { FiX } from 'react-icons/fi'

const formatDateStr = (dateTimeStr) => {
  const [date_, time_] = dateTimeStr.split(' ')
  const [year_, month_, day_] = date_.split('-')
  const [hour_, minute_, second_] = time_.split(':')

  return (
    <>
      <FiCalendar />
      {day_}.{month_}.{year_}
    </>
  )
}

const formatTimeStr = (dateTimeStr) => {
  const [date_, time_] = dateTimeStr.split(' ')
  const [year_, month_, day_] = date_.split('-')
  const [hour_, minute_, second_] = time_.split(':')

  return (
    <>
      <FiClock />
      {hour_}:{minute_}
    </>
  )
}

function InfoPill({ children, opacity = 1, variant = 'solid' }) {
  const bgClass = {
    light: 'bg-black/5',
    dark: 'bg-white/5',
  }[tgTheme]
  const opacityClass = `opacity-${opacity}`
  const borderClass = {
    light: 'border-black',
    dark: 'border-white',
  }[tgTheme]
  const variantClass = {
    solid: bgClass,
    thin: `border-1 ${borderClass}`,
  }[variant]

  return (
    <span
      className={`w-fit ${variantClass} px-4 py-2 text-sm font-mono rounded-4xl flex flex-row flex-nowrap gap-2 justify-start items-center ${opacityClass}`}
    >
      {children}
    </span>
  )
}

function MyGameStatus({ variant }) {
  const text = {
    main: 'Я в основе',
    no: 'Я не приду',
    reserve: 'Я в резерве',
  }[variant]
  const borderClass = {
    reserve: 'border-orange-500',
    main: 'border-green-600',
    no: 'border-red-500',
  }[variant]
  const colorClass = {
    reserve: 'text-orange-500',
    main: 'text-green-600',
    no: 'text-red-500',
  }[variant]

  return (
    <span
      className={`${borderClass} ${colorClass} border-2 py-1 px-2 font-semibold font-mono rounded-4xl flex flex-row flex-nowrap justify-center items-center uppercase text-xs whitespace-nowrap`}
    >
      {text}
    </span>
  )
}

function MyFriendsListItem({ friend, onDeleteClick }) {
  const bgClass = tgTheme == 'light' ? 'bg-black/5' : 'bg-white/5'

  return (
    <div className="flex flex-row flex-nowrap gap-2 justify-start items-center">
      <div className={`${bgClass} py-1 px-3 rounded-4xl w-fit`}>
        {friend.name}
      </div>

      <DangerButton
        size="small"
        onClick={onDeleteClick}
      >
        <FiMinusCircle />
      </DangerButton>
    </div>
  )
}

function MyFriendsList({ myFriends, onDeleteFriendClick }) {
  if (myFriends.length == 0) {
    return null
  }

  const borderClass = tgTheme == 'light' ? 'border-black/15' : 'border-white/15'

  return (
    <div className={`p-4 border-2 ${borderClass} rounded-4xl`}>
      <div>Со мной друзья:</div>
      <div className="mt-2 flex flex-col gap-2 flex-nowrap">
        {myFriends
          .toSorted((a, b) => (a.id < b.id ? 1 : -1))
          .map((friend) => (
            <MyFriendsListItem
              onDeleteClick={() => onDeleteFriendClick(friend.id)}
              key={friend.id}
              friend={friend}
            />
          ))}
      </div>
    </div>
  )
}

const getGamePlayerCodes = (players) => {
  let gamePlayerCodes = []

  for (const player of players) {
    gamePlayerCodes.push(`${player.id}_${player.name}`)
    for (const friend of player.friends) {
      gamePlayerCodes.push(
        `${`${player.id}_${player.name}`}__${`${friend.id}_${friend.name}`}`
      )
    }
  }

  return gamePlayerCodes
}

export function GameListItem({ game, onDeleteClick, onEdit }) {
  const [myGameStatus, setMyGameStatus] = useState(null)
  const [isInGame, setIsInGame] = useState(false)
  const [isAddFriendFormVisible, setIsAddFriendFormVisible] = useState(false)
  const [myFriends, setMyFriends] = useState([])
  const [newFriendName, setNewFriendName] = useState('')
  const [gamePlayerCodes, setGamePlayerCodes] = useState([])

  const { players, addPlayer, removePlayer, setFriends } =
    usePlayerToEventsByEvent(game.id)

  const bgClass = tgTheme == 'light' ? 'bg-black/5' : 'bg-white/5'
  const inputBgClass = tgTheme == 'light' ? 'bg-white/35' : 'bg-black/35'
  const borderClass = tgTheme == 'light' ? 'border-black/15' : 'border-white/15'

  useEffect(() => {
    if (!players) {
      return
    }

    const newGamePlayerCodes = getGamePlayerCodes(players)

    setGamePlayerCodes(newGamePlayerCodes)

    const myPlayerCode = newGamePlayerCodes.find(
      (playerCode) => parseInt(playerCode.split('_')[0]) == window.userId
    )
    const me = players.find((player) => parseInt(player.id) == window.userId)
    const myQueuePosition = myPlayerCode
      ? newGamePlayerCodes.indexOf(myPlayerCode) + 1
      : -1

    let newMyGameStatus = 'no'

    if (myQueuePosition > 0) {
      newMyGameStatus = 'main'
    }

    if (myQueuePosition > game.maxUsersCount) {
      newMyGameStatus = 'reserve'
    }

    setMyGameStatus(newMyGameStatus)

    setIsInGame(myPlayerCode ? true : false)

    setMyFriends(me?.friends || [])
  }, [players])

  const onYesClick = async () => {
    await addPlayer(window.userId, [])
  }

  const onNoClick = async () => {
    setMyFriends([])
    await removePlayer(window.userId)
  }

  const onAddFriend = async () => {
    if (newFriendName == '') {
      return
    }

    const me = players.find((p) => p.id == window.userId)

    await setFriends(window.userId, [{ name: newFriendName }, ...me.friends])

    setNewFriendName('')
    setIsAddFriendFormVisible(false)
  }

  const onCancelAddFriendClick = () => {
    setNewFriendName('')
    setIsAddFriendFormVisible(false)
  }

  const onDeleteFriendClick = async (friendId) => {
    await setFriends(
      window.userId,
      myFriends.filter((f) => f.id != friendId)
    )
  }

  return (
    <div
      className={`flex flex-col flex-nowrap gap-2 w-full p-4 rounded-4xl ${bgClass}`}
    >
      <div className="flex -flex-row flex-nowrap justify-start items-center mb-4 mt-2 gap-4">
        <span className="pl-2">
          <MyGameStatus variant={myGameStatus} />
        </span>

        <div className="text-xl font-semibold w-full flex flex-row flex-nowrap justify-start items-center grow">
          {game.name}
        </div>
      </div>

      <div className="flex flex-row flex-nowrap gap-2 justify-start">
        <InfoPill>{formatDateStr(game.dateTime)}</InfoPill>

        <InfoPill>{formatTimeStr(game.dateTime)}</InfoPill>
      </div>
      <div className="flex flex-row flex-nowrap gap-2 justify-start">
        <InfoPill>
          <FiUser />
          <span className="font-semibold">{gamePlayerCodes.length}</span>
          <span className="opacity-60 text-xs">
            {game.minUsersCount} - {game.maxUsersCount}
          </span>
        </InfoPill>
      </div>

      <div className="flex flex-row flex-nowrap gap-2 justify-start">
        <InfoPill>
          <FiCreditCard />
          {game.price} ₽
        </InfoPill>

        <InfoPill>
          <FiWatch />
          {game.duration} мин
        </InfoPill>
      </div>

      <div className="flex flex-row flex-nowrap gap-2 justify-start mt-2 p-2 mb-4 text-sm">
        {game.description}
      </div>

      <MyFriendsList
        myFriends={myFriends}
        onDeleteFriendClick={onDeleteFriendClick}
      />

      {isAddFriendFormVisible && (
        <div
          className={`flex flex-row flex-nowrap gap-2 justify-start items-center ${bgClass} rounded-4xl p-2 w-full h-[52px]`}
        >
          <input
            type="text"
            className={`border-2 ${borderClass} ${inputBgClass} text-sm rounded-4xl px-2 grow h-[35px] w-[120px]`}
            placeholder="Имя друга"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
          />
          <SuccessButton
            size="small"
            onClick={onAddFriend}
          >
            <FiCheck />
          </SuccessButton>
          <DangerButton
            size="small"
            onClick={onCancelAddFriendClick}
          >
            <FiX />
          </DangerButton>
        </div>
      )}

      {!isAddFriendFormVisible && isInGame && (
        <DefaultButton onClick={() => setIsAddFriendFormVisible(true)}>
          <FiUserPlus />
          Добавить друга
        </DefaultButton>
      )}

      <div className={`flex flex-row flex-nowrap justify-end gap-2`}>
        {!isInGame && (
          <SuccessButton onClick={onYesClick}>
            <FiThumbsUp />
            Участвовать
          </SuccessButton>
        )}

        {isInGame && (
          <NoButton onClick={onNoClick}>
            <FiThumbsDown />
            Отказаться
          </NoButton>
        )}
      </div>

      <div className={`flex flex-row flex-nowrap justify-end gap-2`}>
        {window.isAdmin && (
          <>
            <PrimaryButton onClick={onEdit}>
              <FiEdit2 />
              Изменить
            </PrimaryButton>
            <DangerButton onClick={onDeleteClick}>
              <FiMinusCircle />
              Удалить
            </DangerButton>
          </>
        )}
      </div>
    </div>
  )
}
