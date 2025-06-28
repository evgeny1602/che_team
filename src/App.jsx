import { useEffect, useState } from 'react'
import { useTgAuth, tg, tgColorClasses, isTg } from './tgUtils'

import { AuthLoader } from './AuthLoader'
import { AppContainer } from './AppContainer'
import { Menu } from './Menu'
import { ContentFooter } from './ContentFooter'

function ContentHeading({ text }) {
  return (
    <div
      class={`text-center text-2xl uppercase font-semibold ${tgColorClasses.txt}`}
    >
      {text}
    </div>
  )
}

function MyGamesContent() {
  return <ContentHeading text="Мои игры" />
}

function GamesContent() {
  return <ContentHeading text="Игры" />
}

function PlayersContent() {
  return <ContentHeading text="Игроки" />
}

function MyStatisticsContent() {
  return <ContentHeading text="Моя статистика" />
}

function StatisticsContent() {
  return <ContentHeading text="Статистика" />
}

const pages = [
  { code: 'myGames', title: 'Мои игры', content: MyGamesContent },
  { code: 'games', title: 'Игры', content: GamesContent },
  { code: 'players', title: 'Игроки', content: PlayersContent },
  {
    code: 'myStatistics',
    title: 'Моя статистика',
    content: MyStatisticsContent,
  },
  { code: 'statistics', title: 'Статистика', content: StatisticsContent },
]

function App() {
  const [selectedPageCode, setSelectedPageCode] = useState(pages[0].code)

  const { isTgAuth, tgSendInitData } = useTgAuth()

  useEffect(() => {
    tgSendInitData()
  }, [])

  // if (!isTgAuth) {
  //   return <AuthLoader />
  // }

  const ContentElement = pages.find(
    (page) => page.code === selectedPageCode
  ).content

  if (isTg) {
    tg.requestFullscreen()
  }

  return (
    <AppContainer>
      <ContentElement />
      <ContentFooter />
      <Menu
        selectedPageCode={selectedPageCode}
        pageCodes={pages.map((page) => page.code)}
        onPageCodeSelect={(pageCode) => setSelectedPageCode(pageCode)}
      />
    </AppContainer>
  )
}

export default App
