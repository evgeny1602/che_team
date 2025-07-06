import { useEffect, useState } from 'react'
import * as api from '../api'

export const usePlayers = () => {
  const [players, setPlayers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshPlayers = async () => {
    setIsLoading(true)

    const fetchedPlayers = await api.fetchPlayersList()
    setPlayers(fetchedPlayers)

    setIsLoading(false)
  }

  const removePlayer = async (playerId) => {
    const successDelete = await api.deletePlayer(playerId)

    if (successDelete) {
      await refreshPlayers()
    }
  }

  const approvePlayer = async (playerId) => {
    const successApprove = await api.approvePlayer(playerId)

    if (successApprove) {
      await refreshPlayers()
    }
  }

  useEffect(() => {
    refreshPlayers()
  }, [])

  return { players, isLoading, removePlayer, approvePlayer, refreshPlayers }
}
