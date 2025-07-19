import { useEffect, useState } from 'react'
import * as api from '../api'

export const useGames = () => {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshGames = async () => {
    setIsLoading(true)

    const fetchedGames = await api.fetchEventsList()
    setGames(fetchedGames)

    setIsLoading(false)
  }

  const addGame = async (gameData) => {
    setIsLoading(true)

    const newGameId = await api.addEvent(gameData)
    if (newGameId) {
      await refreshGames()
    }

    setIsLoading(false)
  }

  const removeGame = async (gameId) => {
    const successDelete = await api.deleteEvent(gameId)

    if (successDelete) {
      await refreshGames()
    }
  }

  const editGame = async (gameData) => {
    setIsLoading(true)

    const successEdit = await api.editEvent(gameData)
    if (successEdit) {
      await refreshGames()
    }

    setIsLoading(false)
  }

  useEffect(() => {
    refreshGames()
  }, [])

  return { games, isLoading, refreshGames, addGame, editGame, removeGame }
}
