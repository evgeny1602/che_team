import { WaitingApproveMsg } from './WaitingApproveMsg'
import { RegistrationRequest } from './RegistrationRequest'

import { MyGamesContent } from './MyGamesContent'
import { GamesContent } from './GamesContent'
import { PlayersContent } from './PlayersContent'
import { StatisticsContent } from './StatisticsContent'
import { MyStatisticsContent } from './MyStatisticsContent'

const pages = {
  register: {
    title: 'Заявка на регистрацию',
    content: RegistrationRequest,
  },
  approve: {
    title: 'Заявка на рассмотрении',
    content: WaitingApproveMsg,
  },

  myGames: {
    title: 'Мои игры',
    content: MyGamesContent,
  },
  games: {
    title: 'Игры',
    content: GamesContent,
  },
  players: {
    title: 'Игроки',
    content: PlayersContent,
  },
  // myStatistics: {
  //   title: 'Моя статистика',
  //   content: MyStatisticsContent,
  // },
  // statistics: {
  //   title: 'Статистика',
  //   content: StatisticsContent,
  // },
}

const servicePages = ['register', 'approve']

const contentPages = Object.keys(pages).filter(
  (pageCode) => !servicePages.includes(pageCode)
)

export { pages, servicePages, contentPages }
