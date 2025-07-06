import { tgTheme } from './tgUtils'

import ballDark from './assets/dark-theme/ball.png'
import ballLight from './assets/light-theme/ball.png'

import myGamesLight from './assets/light-theme/my_games.png'
import myGamesDark from './assets/dark-theme/my_games.png'
import myGamesSelected from './assets/selected/my_games.png'

import gamesLight from './assets/light-theme/games.png'
import gamesDark from './assets/dark-theme/games.png'
import gamesSelected from './assets/selected/games.png'

import playersLight from './assets/light-theme/players.png'
import playersDark from './assets/dark-theme/players.png'
import playersSelected from './assets/selected/players.png'

import statisticsLight from './assets/light-theme/statistics.png'
import statisticsDark from './assets/dark-theme/statistics.png'
import statisticsSelected from './assets/selected/statistics.png'

import myStatisticsLight from './assets/light-theme/my_statistics.png'
import myStatisticsDark from './assets/dark-theme/my_statistics.png'
import myStatisticsSelected from './assets/selected/my_statistics.png'

export const selectedImages = {
  myGames: myGamesSelected,
  games: gamesSelected,
  players: playersSelected,
  statistics: statisticsSelected,
  myStatistics: myStatisticsSelected,
}

export const themedImages = {
  light: {
    ball: ballLight,
    myGames: myGamesLight,
    games: gamesLight,
    players: playersLight,
    statistics: statisticsLight,
    myStatistics: myStatisticsLight,
  },
  dark: {
    ball: ballDark,
    myGames: myGamesDark,
    games: gamesDark,
    players: playersDark,
    statistics: statisticsDark,
    myStatistics: myStatisticsDark,
  },
}

export const images = themedImages[tgTheme]
