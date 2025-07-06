import { useEffect, useState } from 'react'
import * as api from '../api'

export const usePlayerToEventsByEvent = (eventId) => {
  const [players, setPlayers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshPlayers = async () => {
    setIsLoading(true)

    const fetchedPlayers = await api.fetchEventPlayersList(eventId)
    setPlayers(fetchedPlayers)

    setIsLoading(false)
  }

  const removePlayer = async (userId) => {
    setIsLoading(true)

    const successDelete = await api.deleteEventPlayer(userId, eventId)

    if (successDelete) {
      await refreshPlayers()
    }

    setIsLoading(false)
  }

  const addPlayer = async (userId, friends) => {
    setIsLoading(true)

    const successAdd = await api.addEventPlayer(userId, eventId, friends)

    if (successAdd) {
      await refreshPlayers()
    }

    setIsLoading(false)
  }

  useEffect(() => {
    refreshPlayers()
  }, [])

  return { players, isLoading, addPlayer, removePlayer, refreshPlayers }
}
