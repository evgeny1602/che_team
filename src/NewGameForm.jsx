import { useGames } from './hooks/useGames'

import { SuccessButton } from './SuccessButton'
import { FormInput } from './FormInput'
import { FormContainer } from './FormContainer'

import { useEffect, useState } from 'react'
import { DangerButton } from './DangerButton'
import { FiPlusCircle } from 'react-icons/fi'
import { FiXCircle } from 'react-icons/fi'
import { FiCheckCircle } from 'react-icons/fi'

export function NewGameForm({ game }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [duration, setDuration] = useState(0)
  const [minUsersCount, setMinUsersCount] = useState(0)
  const [maxUsersCount, setMaxUsersCount] = useState(0)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    const setGame = (game) => {
      if (!game) {
        return
      }

      setId(game.id)
      setName(game.name)
      setDescription(game.description)
      setDateTime(game.dateTime)
      setDuration(game.duration)
      setMinUsersCount(game.minUsersCount)
      setMaxUsersCount(game.maxUsersCount)
      setPrice(game.price)

      setIsExpanded(true)
    }

    setGame(game)
  }, [game])

  const { addGame, editGame, isLoading } = useGames()

  const clearForm = () => {
    setName('')
    setDescription('')
    setDateTime('')
    setDuration(0)
    setMinUsersCount(0)
    setMaxUsersCount(0)
    setPrice(0)
  }

  const onSubmit = async () => {
    let gameData = {
      name,
      description,
      dateTime,
      duration,
      minUsersCount,
      maxUsersCount,
      price,
      userId: window.userId,
    }

    if (id) {
      await editGame({ id, ...gameData })
    } else {
      await addGame(gameData)
    }

    clearForm()

    setIsExpanded(false)
  }

  const isFormValid =
    name != '' &&
    description != '' &&
    dateTime != '' &&
    duration != 0 &&
    minUsersCount != 0 &&
    maxUsersCount != 0 &&
    price != 0

  return (
    <FormContainer
      isExpanded={isExpanded}
      title={
        <span className="flex flex-row flex-nowrap gap-2 items-center">
          <FiPlusCircle />
          Добавить игру
        </span>
      }
    >
      <div className="w-full flex flex-col flex-nowrap gap-6 justify-center">
        <FormInput
          label="Дата и время"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />

        <FormInput
          label="Название"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormInput
          label="Описание"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormInput
          label="Длительность (минуты)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <FormInput
          label="Людей (минимум)"
          type="number"
          value={minUsersCount}
          onChange={(e) => setMinUsersCount(e.target.value)}
        />

        <FormInput
          label="Людей (максимум)"
          type="number"
          value={maxUsersCount}
          onChange={(e) => setMaxUsersCount(e.target.value)}
        />

        <FormInput
          label="Цена (рубли)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-row flex-nowrap gap-4 justify-center items-center mt-8">
        <SuccessButton
          disabled={!isFormValid}
          onClick={onSubmit}
          isLoading={isLoading}
        >
          <FiCheckCircle />
          Сохранить
        </SuccessButton>

        <DangerButton onClick={clearForm}>
          <FiXCircle />
          Очистить
        </DangerButton>
      </div>
    </FormContainer>
  )
}
