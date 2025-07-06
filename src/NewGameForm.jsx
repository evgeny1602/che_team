import { useGames } from './hooks/useGames'

import { SuccessButton } from './SuccessButton'
import { FormInput } from './FormInput'
import { FormContainer } from './FormContainer'

import { useState } from 'react'
import { DangerButton } from './DangerButton'
import { FiPlusCircle } from 'react-icons/fi'
import { FiXCircle } from 'react-icons/fi'
import { FiCheckCircle } from 'react-icons/fi'

export function NewGameForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [duration, setDuration] = useState(0)
  const [minUsersCount, setMinUsersCount] = useState(0)
  const [maxUsersCount, setMaxUsersCount] = useState(0)
  const [price, setPrice] = useState(0)

  const { addGame, isLoading } = useGames()

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
    await addGame({
      name,
      description,
      dateTime,
      duration,
      minUsersCount,
      maxUsersCount,
      price,
      userId: window.userId,
    })
    clearForm()
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
          Добавить
        </SuccessButton>

        <DangerButton onClick={clearForm}>
          <FiXCircle />
          Очистить
        </DangerButton>
      </div>
    </FormContainer>
  )
}
