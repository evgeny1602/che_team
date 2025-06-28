import { useEffect, useState } from 'react'
import { useTgAuth, tg, tgColorClasses } from './tgUtils'

import { images, selectedImages } from './images'

import { AuthLoader } from './AuthLoader'

function MenuBtn({ icon, onClick, isSelected }) {
  return (
    <div
      className={`transition-colors duration-300 flex flex-col flex-nowrap justify-center items-center h-full border-t-4 ${
        isSelected ? 'border-[#df530e]' : 'border-transparent'
      }`}
    >
      <img
        src={isSelected ? selectedImages[icon] : images[icon]}
        className={`w-[35px] h-[35px] opacity-80`}
        onClick={onClick}
      />
    </div>
  )
}

function Menu() {
  const [selectedPage, setSelectedPage] = useState('myGames')

  const pages = ['myGames', 'games', 'players', 'myStatistics', 'statistics']

  return (
    <div
      className={`fixed bottom-0 left-[50%] mb-4 flex h-[50px] w-[90vw] -translate-x-[50%] flex-row flex-nowrap items-center justify-center gap-6 rounded-4xl ${tgColorClasses.bg}/50 ${tgColorClasses.txt} shadow-[0_0_10px] shadow-black/20 inset-shadow-[0_0_10px] inset-shadow-white/20 backdrop-blur-sm`}
    >
      {pages.map((page) => (
        <MenuBtn
          icon={page}
          isSelected={selectedPage === page}
          onClick={() => setSelectedPage(page)}
          key={page}
        />
      ))}
    </div>
  )
}

function ContentFooter() {
  return (
    <div>
      <br />
      <br />
      <br />
      &nbsp;
    </div>
  )
}

function Content() {
  return (
    <div>
      CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT
      HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE
      CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT
      HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE
      CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT
      HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE
      CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT
      HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE
      CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT
      HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE
      CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT
      HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE
      CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT
      HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE
      CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT
      HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE
      CONTENT HERE CONTENT HERE CONTENT HERE CONTENT HERE
    </div>
  )
}

function AppContainer({ children }) {
  return (
    <div className="h-[100vh] p-4 text-slate-500 relative w-full">
      {children}
    </div>
  )
}

function App() {
  const { isTgAuth, tgSendInitData } = useTgAuth()

  useEffect(() => {
    tgSendInitData()
  }, [])

  // if (!isTgAuth) {
  //   return <AuthLoader />
  // }

  return (
    <AppContainer>
      <Content />
      <ContentFooter />
      <Menu />
    </AppContainer>
  )
}

export default App
